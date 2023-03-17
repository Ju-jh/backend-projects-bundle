import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amuwiki } from 'src/amuwiki/schema/amuwiki.schema';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/schemas/user.schema';
import { CreatePostDto } from './dto/createPost.dto';
import { EditPostDto } from './dto/editPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Amuwiki')
    private readonly amuwikiModel: Model<Amuwiki>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async getEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async getNickname(email: string) {
    const isNickname = await this.userModel.findOne({ email: email });
    return await isNickname.nickname;
  }

  async getContributors(nickname: string) {
    return await this.amuwikiModel.findOne({ contributors: nickname });
  }

  async detoken(cookie: string): Promise<string> {
    const info = await this.authService.parseToken(cookie);
    const email = Object.values(info)[0] as string;
    return email;
  }

  async createPost(postData: CreatePostDto, email): Promise<any> {
    const findEmail = await this.getEmail(email);
    const nickname = await this.getNickname(email);

    if (findEmail) {
      const temp = {
        namespace: 0,
        title: postData.title,
        text: postData.text,
        contributors: nickname,
      };
      const postSave = new this.amuwikiModel(temp);
      return await postSave.save();
    } else {
      return { message: '이메일이 존재하지 않습니다.' };
    }
  }

  async editPost(email, editPostDto: EditPostDto) {
    const findEmail = await this.getEmail(email);

    if (findEmail.email === email) {
      const temp = {
        title: editPostDto.title,
        text: editPostDto.text,
      };
      return await this.amuwikiModel.updateOne(temp);
    } else {
      return { message: '이메일이 존재하지 않습니다.' };
    }
  }

  async deletePost(email) {
    const findEmail = await this.getEmail(email);

    if (findEmail) {
      const findNickname = await this.getNickname(email);
      const findContributors = await this.getContributors(findNickname);
      await this.amuwikiModel.deleteOne({
        findContributors,
      });
    } else {
      return { message: '이메일이 존재하지 않습니다.' };
    }
  }
}
