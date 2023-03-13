import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateProfileDto } from './dto/createProfile.dto';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    @InjectModel('Profile')
    private profileModel: Model<Profile>,
  ) {}

  async getEmail(isemail: string) {
    return await this.userModel.findOne({ where: { email: isemail } });
  }

  async createProfile(
    email: string,
    profile: CreateProfileDto,
  ): Promise<Profile> {
    const isprofile = await this.getEmail(email);
    const isdata = {
      email: isprofile.email,
      nickname: isprofile.nickname,
      password: isprofile.password,
      phoneNumber: profile.phoneNumber,
    };
    const issave = new this.profileModel(isdata);
    return await issave.save();
  }

  async getBasicProfile(options: { email: string }) {
    return await this.getEmail(options.email);
  }

  async getEditProfile(options: { email: string }) {
    return await this.profileModel.findOne({ where: { email: options.email } });
  }
}
