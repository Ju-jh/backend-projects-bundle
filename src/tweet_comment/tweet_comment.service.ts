import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicCommentDto } from './dto/basicComment.dto';
import { CreateCommentDto } from './dto/createComment.dto';
import { EditCommentDto } from './dto/editComment.dto';
import { TweetComment } from './entities/tweet_comment.entity';

@Injectable()
export class TweetCommentService {
  constructor(
    @InjectRepository(TweetComment)
    private tweetCommentRepository: Repository<TweetComment>,
  ) {}

  async getAllComment() {
    return await this.tweetCommentRepository.find();
  }

  // async getOneComment(data: number): Promise<BasicCommentDto> {
  //   // return await this.tweetCommentRepository.findOne({ where: { id: data } });
  // }

  async createComment(
    tweetCommentData: CreateCommentDto,
    id: number,
  ): Promise<CreateCommentDto> {
    try {
      const data = {
        ...tweetCommentData,
      };
      console.log('@@@@@@@@@@@', data);

      data.userId = id;
      return await this.tweetCommentRepository.save(data);
    } catch (e) {
      console.log(e);
    }
  }

  async updateComment(updateData: EditCommentDto): Promise<EditCommentDto> {
    return await this.tweetCommentRepository.save(updateData);
  }

  async deleteComment(id: number) {
    return await this.tweetCommentRepository.delete(id);
  }
}
