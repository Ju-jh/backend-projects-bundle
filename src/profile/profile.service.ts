import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Profile } from './schemas/profile.schema';
import { AuthService } from 'src/auth/auth.service';
import { EditNicknameDto } from './dto/editNickname.dto';
import { EditPasswordDto } from './dto/editPassword.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  constructor(
    private readonly authService: AuthService,
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Profile')
    private readonly profileModel: Model<Profile>,
  ) {}

  validatePassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    return passwordRegex.test(password);
  }

  validateNickname(nickname: string): boolean {
    const nicknameregex = /^[^`~!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/\?]{5,10}$/;
    return nicknameregex.test(nickname);
  }

  async handleGetProfile(cookie: string) {
    const email = await this.authService.cookieToEmail(cookie);
    const user = await this.authService.getUser(email);
    const data = {
      email: user.email,
      nickname: user.nickname,
      photo: user.photo,
    };
    return data;
  }

  async handleEditNickname(cookie: string, dto: EditNicknameDto) {
    const email = await this.authService.cookieToEmail(cookie);
    const user = await this.authService.getUser(email);
    user.nickname = dto.nickname;
    await user.save();
    return { message: '닉네임이 수정되었습니다.' };
  }

  async handleEditPassword(cookie: string, dto: EditPasswordDto) {
    const email = await this.authService.cookieToEmail(cookie);
    const user = await this.authService.getUser(email);
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      return { message: '기존 비밀번호가 틀렸습니다.' };
    }
    user.password = await bcrypt.hash(dto.newPassword, 10);
    await user.save();
    return { message: '패스워드가 수정되었습니다.' };
  }
}
