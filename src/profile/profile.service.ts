import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateProfileDto } from './dto/createProfile.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { Profile } from './schemas/profile.schema';
import { Multipart } from 'fastify-multipart';
import { AppResponseDto } from './dto/uploadProfile.dto';
import { AuthService } from 'src/auth/auth.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import stream from 'stream';
import * as fs from 'fs';
import * as util from 'util';

@Injectable()
export class ProfileService {
  constructor(
    private readonly authService: AuthService,
    @InjectModel('User')
    private userModel: Model<User>,
    @InjectModel('Profile')
    private profileModel: Model<Profile>,
  ) {}

  async detoken(cookie: string): Promise<string> {
    const info = await this.authService.parseToken(cookie);
    const email = Object.values(info)[0] as string;
    return email;
  }

  async getEmail(isemail: string) {
    return await this.userModel.findOne({ email: isemail });
  }

  async getBasicProfile(email: string) {
    return await this.getEmail(email);
  }

  async getEditProfile(email: string) {
    return await this.profileModel.findOne({ email: email });
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

  validatePhoneNumber(phoneNumber: number): boolean {
    const phoneNumberregex = /^8201([0|1|6|7|8|9])(\d{3}|\d{4})(\d{4})$/;
    const phoneNumberStr = phoneNumber.toString();
    return phoneNumberregex.test(phoneNumberStr);
  }

  async createProfile(email: string, profile: CreateProfileDto) {
    const isprofile = await this.getEmail(email);
    const uniquePhoneNumber = await this.profileModel.findOne({
      phoneNumber: profile.phoneNumber,
    });
    if (profile.phoneNumber == +uniquePhoneNumber) {
      return { message: '입력한 핸드폰 번호는 이미 등록된 번호입니다.' };
    }
    const data = {
      email: isprofile.email,
      nickname: isprofile.nickname,
      password: isprofile.password,
      phoneNumber: profile.phoneNumber,
    };
    const createPhoneNumber = this.validatePhoneNumber(data.phoneNumber);
    if (!createPhoneNumber) {
      return { message: '올바른 핸드폰번호 형식이 아닙니다.' };
    }
    const issave = new this.profileModel(data);
    await issave.save();
    return { message: '프로필 정보가 등록되었습니다.' };
  }

  async editProfile(email: string, updateData: EditProfileDto) {
    const isfrofile = await this.getEditProfile(email);
    const data = {
      email: isfrofile.email,
      nickname: isfrofile.nickname,
      password: isfrofile.password,
      phoneNumber: isfrofile.phoneNumber,
    };

    const editNickname = this.validateNickname(updateData.nickname);
    if (!editNickname) {
      return { message: '올바른 닉네임 형식이 아닙니다.' };
    }
    data.nickname = updateData.nickname;

    const editPassword = this.validatePassword(updateData.password);
    if (!editPassword) {
      return { message: '올바른 비밀번호 형식이 아닙니다.' };
    }
    data.password = updateData.password;

    const editPhoneNumber = this.validatePhoneNumber(updateData.phoneNumber);
    if (!editPhoneNumber) {
      return { message: '올바른 핸드폰번호 형식이 아닙니다.' };
    }
    data.phoneNumber = updateData.phoneNumber;
    await this.profileModel.update({ email: email }, data);
    return { message: '프로필을 수정했습니다.' };
  }

  async uploadFile(
    email: string,
    req: FastifyRequest & Multipart,
    res: FastifyReply<any>,
  ): Promise<any> {
    const mp = await req.multipart(this.handler, onEnd);
    mp.on('field', function (key: any, value: any) {
      console.log('form-data', key, value);
    });
    async function onEnd(err: any) {
      if (err) {
        res.send(new HttpException('Internal server error', 500));
        return;
      }
      res
        .code(200)
        .send(
          new AppResponseDto(200, undefined, '프로필 이미지 업로드 성공!!'),
        );
    }
  }

  async handler(field: string, file: any, filename: string): Promise<void> {
    const pipeline = util.promisify(stream.pipeline);
    const writeStream = fs.createWriteStream(`uploads/${filename}`);
    await pipeline(file, writeStream);
  }
}
