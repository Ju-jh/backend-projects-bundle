import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as nodemailer from 'nodemailer';
import { VerifyEmailCodeDto } from './dto/verifyEmailCode.dto';
import { VerifiedEmail } from './schemas/verifiedEmail.schema';

@Injectable()
export class UserService {
  private emailVerificationCodes = new Map<string, string>();
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('VerifiedEmail')
    private readonly verifiedEmail: Model<VerifiedEmail>,
  ) {}

  validateEmail(email: string): boolean {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  async isEmailExistinVerified(email: string): Promise<boolean> {
    const user = await this.verifiedEmail.findOne({ email });
    return !!user;
  }

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
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

  async saveVerifiedEmail(
    verifyEmailCodeDto: VerifyEmailCodeDto,
  ): Promise<VerifiedEmail> {
    const saveEmail = new this.verifiedEmail(verifyEmailCodeDto);
    return await saveEmail.save();
  }
}
