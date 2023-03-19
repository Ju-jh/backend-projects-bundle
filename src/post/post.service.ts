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

  async getNickname(email: string) {
    const isNickname = await this.userModel.findOne({ email: email });
    return await isNickname.nickname;
  }

  async detoken(cookie: string): Promise<string> {
    const info = await this.authService.parseToken(cookie);
    const email = Object.values(info)[0] as string;
    return email;
  }

  async createPost(email: string, dto: CreatePostDto): Promise<any> {
    const nickname = await this.getNickname(email);

    const temp = {
      namespace: 0,
      title: dto.title,
      text: dto.text,
      contributors: nickname,
    };
    return await new this.amuwikiModel(temp).save();
  }

  async editPost(email: string, dto: EditPostDto) {
    const nickname = await this.getNickname(email);
    const check = await this.amuwikiModel.findOne({ contributors: nickname });

    const temp = {
      namespace: 0,
      title: dto.title,
      text: dto.text,
      contributors: nickname,
    };
    Object.assign(check, temp);
    return check.save();
  }

  async deletePost(email: string) {
    const nickname = await this.getNickname(email);
    return await this.amuwikiModel.deleteOne({
      contributors: nickname,
    });
  }
}
