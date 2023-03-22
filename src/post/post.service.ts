import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amuwiki } from 'src/amuwiki/schema/amuwiki.schema';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/schemas/user.schema';
import { CreatePostDto } from './dto/createpost.dto';
import { DeletePostDto } from './dto/deletepost.dto';
import { DetailPostDto } from './dto/detailpost.dto';
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

  async detoken(cookie: string): Promise<string> {
    const info = await this.authService.parseToken(cookie);
    const email = Object.values(info)[0] as string;
    return email;
  }

  async getDetailPost(dto: DetailPostDto) {
    const post = await this.amuwikiModel.find({ _id: dto._id });
    const temp = post.map((dto) => ({
      _id: dto._id,
      title: dto.title,
      text: dto.text,
    }));
    return temp;
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

  async editPost(email: string, dto: EditPostDto) {
    const post = await this.amuwikiModel.findOne({ _id: dto._id });

    const temp = {
      _id: dto._id,
      namespace: 0,
      title: dto.title,
      text: dto.text,
      contributors: email,
    };
    Object.assign(post, temp);
    return post.save();
  }

  async deletePost(dto: DeletePostDto) {
    const remove = await this.amuwikiModel.deleteOne({
      _id: dto._id,
    });
    return remove;
  }
}
