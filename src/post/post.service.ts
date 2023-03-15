import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amuwiki } from 'src/amuwiki/schema/amuwiki.schema';
import { User } from 'src/user/schemas/user.schema';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Amuwiki')
    private amuwikiModel: Model<Amuwiki>,
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async getEmail(isemail: string) {
    return await this.userModel.findOne({ where: { email: isemail } });
  }

  async getNickname(email) {
    const isNickname = await this.userModel.findOne({
      where: { email: email },
    });
    return await isNickname.nickname;
  }

  async createPost(postData: CreatePostDto, email): Promise<any> {
    const findEmail = await this.getEmail(email);
    console.log('!!!!!!!!!!!!!!!!!', findEmail);
    const nickname = await this.getNickname(email);

    if (findEmail) {
      const temp = {
        namespace: 0,
        title: postData.title,
        text: postData.text,
        contributors: nickname,
      };
      const postSave = new this.amuwikiModel(temp);
      console.log(postSave);

      return await postSave.save();
    } else {
      return { message: '이메일이 존재하지 않습니다.' };
    }
  }

  async deletePost(email) {
    const findEmail = await this.getEmail(email);
    if (findEmail) {
      const findNickname = await this.getNickname;
      await this.amuwikiModel.findOneAndDelete({
        where: { contributors: findNickname },
      });
    } else {
      return { message: '이메일이 존재하지 않습니다.' };
    }
  }
}
