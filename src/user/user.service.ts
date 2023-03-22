import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './schemas/user.schema';
import * as nodemailer from 'nodemailer';
import { VerifyEmailCodeDto } from './dto/verifyemailcode.dto';
import * as bcrypt from 'bcrypt';
import { VerifyEmailDto } from './dto/verifyemail.dto';
import { VerifiedEmail } from './schemas/verifiedemail.schema';

@Injectable()
export class UserService {
  private emailVerificationCodes = new Map<string, string>();
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('VerifiedEmail')
    private readonly verifiedEmail: Model<VerifiedEmail>,
  ) {}

  async saveVerifiedEmail(dto: VerifyEmailCodeDto): Promise<VerifiedEmail> {
    const saveEmail = new this.verifiedEmail(dto);
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
    const nicknameregex = /^[^`~!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/\?]{5,10}$/;
    return nicknameregex.test(nickname);
  }

  async isEmailExistinVerified(email: string): Promise<boolean> {
    const user = await this.verifiedEmail.findOne({ email });
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

  sendEmailVerificationCode(email: string): string {
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

  async handleEmail(dto: VerifyEmailDto): Promise<{ message: string }> {
    const isEmailValid = this.isValidateEmail(dto.email);
    if (!isEmailValid) {
      return { message: '올바른 이메일 형식이 아닙니다.' };
    }
    const isEmailExist = await this.isEmailExistinVerified(dto.email);
    if (isEmailExist) {
      return { message: '이미 존재하는 이메일입니다.' };
    }
    const emailVerificationCode = this.sendEmailVerificationCode(dto.email);
    emailVerificationCode;
    return {
      message: '이메일 인증 코드가 발송되었습니다. 인증 코드를 입력하세요.',
    };
  }

  async handleVerifying(dto: VerifyEmailCodeDto): Promise<{ message: string }> {
    const isCodeValid = await this.verifyEmail(dto.email, dto.code);
    if (!isCodeValid) {
      return {
        message: '이메일 인증 코드가 유효하지 않습니다.',
      };
    }
    this.saveVerifiedEmail(dto);
    return { message: '이메일 인증이 완료되었습니다.' };
  }

  async handleVerified(dto: CreateUserDto): Promise<{ message: string }> {
    const isEmailValid = this.isValidateEmail(dto.email);
    if (!isEmailValid) {
      return { message: '올바른 이메일 형식이 아닙니다.' };
    }
    const isEmailExist = await this.isEmailExist(dto.email);
    if (isEmailExist) {
      return { message: '이미 존재하는 이메일입니다.' };
    }
    const isEmailVerified = await this.isEmailExistinVerified(dto.email);
    if (isEmailVerified === false) {
      return { message: '인증되지 않은 이메일입니다.' };
    }
    const isNicknameExist = await this.isNicknameExist(dto.nickname);
    if (isNicknameExist) {
      return { message: '이미 존재하는 닉네임입니다.' };
    }
    const isNicknameValid = this.isValidateNickname(dto.nickname);
    if (!isNicknameValid) {
      return {
        message:
          '닉네임은 5자 이상 10자 이하, 영문자,숫자,한글만 사용할 수 있습니다.',
      };
    }
    const isPasswordValid = this.isValidatePassword(dto.password);
    if (!isPasswordValid) {
      return {
        message:
          '비밀번호는 8자 이상 20자 이하, 영문자,숫자,특수문자를 포함해야합니다.',
      };
    }
    this.createUser(dto);
    return { message: 'AMUWIKI 회원가입이 완료되었습니다.' };
  }
}
