import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './schemas/user.schema';
import * as nodemailer from 'nodemailer';
import { VerifyEmailCodeDto } from './dto/verifyemailcode.dto';
import * as bcrypt from 'bcrypt';
import { VerifyEmailDto } from './dto/verifyemail.dto';
import { VerifiedEmail } from './schemas/verifiedemail.schema';
import { Profile } from 'src/profile/schemas/profile.schema';

@Injectable()
export class UserService {
  private emailVerificationCodes = new Map<string, string>();
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('VerifiedEmail')
    private readonly verifiedEmailModel: Model<VerifiedEmail>,
    @InjectModel('Profile')
    private readonly profileModel: Model<Profile>,
  ) {}

  async saveVerifiedEmail(dto: VerifyEmailCodeDto): Promise<VerifiedEmail> {
    const saveEmail = new this.verifiedEmailModel(dto);
    return await saveEmail.save();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    dto.password = await bcrypt.hash(dto.password, 10);
    dto.createdAt = new Date();
    const createdUser = new this.userModel(dto);
    return await createdUser.save();
  }

  isValidateEmail(email: string): boolean {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  isValidatePassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    return passwordRegex.test(password);
  }

  isValidateNickname(nickname: string): boolean {
    const nicknameregex = /^[^`~!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/\?]{3,10}$/;
    return nicknameregex.test(nickname);
  }

  async isEmailExistinVerified(email: string): Promise<boolean> {
    const user = await this.verifiedEmailModel.findOne({ email });
    return !!user;
  }

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }

  async isNicknameExist(nickname: string): Promise<boolean> {
    const user = await this.userModel.findOne({ nickname });
    return !!user;
  }

  async verifyEmail(email: string, code: string): Promise<boolean> {
    const storedCode = this.emailVerificationCodes.get(email);
    if (!storedCode) {
      return false;
    }
    if (storedCode !== code) {
      return false;
    }
    this.emailVerificationCodes.delete(email);
    return true;
  }

  async deleteAlreadyVerifiedEmail(email: string) {
    await this.verifiedEmailModel.findOneAndDelete({ email });
  }

  async sendEmailVerificationCode(email: string): Promise<string> {
    const code = Math.random()
      .toString(+process.env.STRINGCODE)
      .substring(+process.env.SUBSTRINGCODE1, +process.env.SUBSTRINGCODE2);
    this.emailVerificationCodes.set(email, code);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'AmuWiki',
      to: email,
      subject: 'AMUWIKI 이메일 인증 코드',
      text: `안녕하세요! AMUWIKI입니다.\n\n이메일 인증 코드: ${code}\n\n이용해 주셔서 감사합니다.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      }
    });
    return code;
  }

  async helpEmailServie(dto: VerifyEmailDto): Promise<{ message: string }> {
    try {
      const isEmailValid = this.isValidateEmail(dto.email);
      if (!isEmailValid) {
        throw new Error('올바른 이메일 형식이 아닙니다.');
      }
      const isEmailExist = await this.isEmailExist(dto.email);
      if (!isEmailExist) {
        throw new Error('계정이 존재하지 않습니다.');
      }
      const isCodeSent = await this.sendEmailVerificationCode(dto.email);
      if (!isCodeSent) {
        throw new Error(
          '코드전송에 문제가 생겼습니다. 자세한 사항은 관리자에게 문의하세요.',
        );
      }
      return {
        message: '이메일 인증 코드가 발송되었습니다. 인증 코드를 입력하세요.',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async handleEmail(dto: VerifyEmailDto): Promise<{ message: string }> {
    try {
      const isEmailValid = this.isValidateEmail(dto.email);
      if (!isEmailValid) {
        throw new Error('올바른 이메일 형식이 아닙니다.');
      }
      const isEmailExist = await this.isEmailExist(dto.email);
      if (isEmailExist) {
        throw new Error('이미 존재하는 이메일입니다.');
      }
      const isCodeSent = await this.sendEmailVerificationCode(dto.email);
      if (!isCodeSent) {
        throw new Error(
          '코드전송에 문제가 생겼습니다. 자세한 사항은 관리자에게 문의하세요.',
        );
      }
      return {
        message: '이메일 인증 코드가 발송되었습니다. 인증 코드를 입력하세요.',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async handleVerifying(dto: VerifyEmailCodeDto): Promise<{ message: string }> {
    try {
      const isCodeValid = await this.verifyEmail(dto.email, dto.code);
      if (!isCodeValid) {
        throw new Error('이메일 인증 코드가 유효하지 않습니다.');
      }
      await this.deleteAlreadyVerifiedEmail(dto.email);
      const isEmailSaved = await this.saveVerifiedEmail(dto);
      if (!isEmailSaved) {
        throw new Error(
          '이메일 인증에 문제가 생겼습니다. 자세한 사항은 관리자에게 문의하세요.',
        );
      }
      return { message: '이메일 인증이 완료되었습니다.' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async handleVerified(dto: CreateUserDto): Promise<{ message: string }> {
    try {
      const isEmailValid = this.isValidateEmail(dto.email);
      if (!isEmailValid) {
        throw new Error('올바른 이메일 형식이 아닙니다.');
      }
      const isNicknameValid = this.isValidateNickname(dto.nickname);
      if (!isNicknameValid) {
        throw new Error(
          '닉네임은 3자 이상 10자 이하, 영문자,숫자,한글만 사용할 수 있습니다.',
        );
      }
      const isPasswordValid = this.isValidatePassword(dto.password);
      if (!isPasswordValid) {
        throw new Error(
          '비밀번호는 8자 이상 20자 이하, 영문자,숫자,특수문자를 포함해야합니다.',
        );
      }
      const isEmailExist = await this.isEmailExist(dto.email);
      if (isEmailExist) {
        throw new Error('이미 존재하는 이메일입니다.');
      }
      const isEmailVerified = await this.isEmailExistinVerified(dto.email);
      if (isEmailVerified === false) {
        throw new Error('인증되지 않은 이메일입니다.');
      }
      const isNicknameExist = await this.isNicknameExist(dto.nickname);
      if (isNicknameExist) {
        throw new Error('이미 존재하는 닉네임입니다.');
      }
      const temp = {
        email: dto.email,
        nickname: dto.nickname,
      };
      const isProfileCreated = await new this.profileModel(temp).save();
      if (!isProfileCreated) {
        throw new Error(
          '프로필 생성에 문제가 생겼습니다. 자세한 사항은 관리자에게 문의하세요.',
        );
      }
      const isUserCreated = await this.createUser(dto);
      if (!isUserCreated) {
        throw new Error(
          '회원가입에 문제가 생겼습니다. 자세한 사항은 관리자에게 문의하세요.',
        );
      }
      const deletedvalidateEmail =
        await this.verifiedEmailModel.findOneAndDelete({
          email: dto.email,
        });
      if (!deletedvalidateEmail) {
        throw new Error(
          '이메일 인증 정보 삭제에 실패했습니다. 자세한 사항은 관리자에게 문의하세요.',
        );
      }
      return { message: 'AMUWIKI 회원가입이 완료되었습니다.' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
