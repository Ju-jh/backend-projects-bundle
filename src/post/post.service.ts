import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amuwiki } from 'src/amuwiki/schema/amuwiki.schema';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/schemas/user.schema';
import { CreatePostDto } from './dto/createpost.dto';
import { DeletePostDto } from './dto/deletepost.dto';
import { EditPostDto } from './dto/editpost.dto';

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
    const temp = {
      namespace: 0,
      title: dto.title,
      text: dto.text,
      contributors: email,
    };
    return await new this.amuwikiModel(temp).save();
  }

  async editPost(
    email: string,
    dto: EditPostDto,
  ): Promise<{ message: string; statusCode: number }> {
    const post = await this.amuwikiModel.findOne({ _id: dto._id });

    if (!post) {
      return { message: '게시글이 존재하지 않습니다.', statusCode: 400 };
    }

    if (email !== post.contributors[0]) {
      return { message: '게시글의 소유자가 아닙니다.', statusCode: 400 };
    }
    const temp = {
      _id: dto._id,
      namespace: 0,
      title: dto.title,
      text: dto.text,
      contributors: email,
    };
    Object.assign(post, temp);

    post.save();
    return { message: '게시글이 수정되었습니다.', statusCode: 201 };
  }

  async deletePost(
    email: string,
    dto: DeletePostDto,
  ): Promise<{ message: string; statusCode: number }> {
    const post = await this.amuwikiModel.findOne({ _id: dto._id });

    if (!post) {
      return { message: '게시글이 존재하지 않습니다.', statusCode: 400 };
    }

    if (email !== post.contributors[0]) {
      return { message: '게시글의 소유자가 아닙니다.', statusCode: 400 };
    }

    await this.amuwikiModel.deleteOne({
      _id: dto._id,
    });

    return { message: '게시글이 삭제되었습니다.', statusCode: 200 };
  }
}
