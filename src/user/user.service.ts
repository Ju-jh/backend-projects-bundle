import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import * as nodemailer from 'nodemailer';
import { VerifyEmailCodeDto } from './dto/verifyEmailCode.dto';
import { VerifiedEmail } from './schemas/verifiedemail.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private emailVerificationCodes = new Map<string, string>();
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('VerifiedEmail')
    private readonly verifiedEmail: Model<VerifiedEmail>,
  ) {}

  async saveVerifiedEmail(
    verifyEmailCodeDto: VerifyEmailCodeDto,
  ): Promise<VerifiedEmail> {
    const saveEmail = new this.verifiedEmail(verifyEmailCodeDto);
    return await saveEmail.save();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.createdAt = new Date();
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  validateEmail(email: string): boolean {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    return passwordRegex.test(password);
  }

  validateNickname(nickname: string): boolean {
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
    const code = Math.random().toString(36).substring(2, 8);
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
      text: `안녕하세요! AMUWIKI입니다.\n\n이메일 인증 코드: ${code}\n\n감사합니다.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    return code;
  }
}
