import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';
import { AuthService } from 'src/auth/auth.service';
import { EditNicknameDto } from './dto/editnickname.dto';
import { EditPasswordDto } from './dto/editpassword.dto';
import * as bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply } from 'fastify';
import * as fs from 'fs';
import * as util from 'util';
import { pipeline } from 'stream';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @InjectModel('Profile')
    private readonly profileModel: Model<Profile>,
  ) {}

  async getUser(cookie: string) {
    const email = await this.authService.cookieToEmail(cookie);
    return await this.authService.getUser(email);
  }

  async getPump(data) {
    const pump = util.promisify(pipeline);
    return await pump(
      data.file,
      fs.createWriteStream(`./uploads/${data.filename}`),
    );
  }

  async getProfile(email) {
    return await this.profileModel.findOne({ email: email });
  }

  async handleGetProfile(cookie: string) {
    const user = await this.getUser(cookie);
    const profile = await this.getProfile(user.email);
    const data = {
      email: user.email,
      nickname: user.nickname,
      url: profile?.url,
    };
    return data;
  }

  async handleEditNickname(cookie: string, dto: EditNicknameDto) {
    const user = await this.getUser(cookie);

    const NicknameValidate = await this.userService.isValidateNickname(
      dto.nickname,
    );
    if (!NicknameValidate) {
      return {
        message:
          '닉네임은 3자 이상 10자 이하, 영문자,숫자,한글만 사용할 수 있습니다.',
      };
    }
    const nicknameExist = await this.userService.isNicknameExist(dto.nickname);
    if (nicknameExist) {
      return { message: '이미 존재하는 닉네임입니다.' };
    }
    user.nickname = dto.nickname;
    await user.save();
    return { message: '닉네임 수정했습니다.' };
  }

  async handleEditPassword(cookie: string, dto: EditPasswordDto) {
    const user = await this.getUser(cookie);
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      return { message: '기존 비밀번호가 틀렸습니다.' };
    }
    const validatePassword = await this.userService.isValidatePassword(
      dto.newPassword,
    );
    if (!validatePassword) {
      return {
        message:
          '비밀번호는 8자 이상 20자 이하, 영문자,숫자,특수문자를 포함해야합니다.',
      };
    }
    user.password = await bcrypt.hash(dto.newPassword, 10);
    await user.save();
    return { message: '비밀번호 수정했습니다.' };
  }

  async handleUploadImage(
    cookie: string,
    req: FastifyRequest,
    res: FastifyReply,
  ) {
    const user = await this.getUser(cookie);
    const data = await req.file();
    const imageUrl = `./uploads/${data.filename}`;

    const temp = {
      email: user.email,
      nickname: user.nickname,
      url: imageUrl,
    };
    const Profile = await this.profileModel.findOne({ email: temp.email });
    if (data.mimetype !== 'image/jpeg' && data.mimetype !== 'image/png') {
      return { message: '파일이 이미지가 아닙니다.' };
    }
    this.getPump(data);
    if (!Profile) {
      await new this.profileModel(temp).save();
      return res.send('프로필 이미지가 업로드되었습니다.');
    }
    Profile.url = temp.url;
    await new this.profileModel(Profile).save();
    return res.send('프로필 이미지가 수정되었습니다.');
  }

  async getImage(cookie: string): Promise<Buffer> {
    const user = await this.getUser(cookie);
    const profile = await this.profileModel.findOne({ email: user.email });
    const url = await profile.url.split('/')[2];
    const imgTag = `./uploads/${url}`;
    return await fs.readFileSync(imgTag);
  }
}
