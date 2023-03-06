import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/tweet_post/entities/tweet.entity';
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
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}

  async getAllComment() {
    return await this.tweetCommentRepository.find();
  }

  async findByTweetId(id: number) {
    return await this.tweetRepository.findOne({
      where: { userId: id },
    });
  }

  // async getOneComment(data: number): Promise<BasicCommentDto> {
  //   // return await this.tweetCommentRepository.findOne({ where: { id: data } });
  // }

  async createComment(
    tweetCommentData: CreateCommentDto,
    id: number,
  ): Promise<CreateCommentDto> {
    try {
      const isTweet = await this.findByTweetId(id);
      console.log('#############', isTweet);
      const tweetId = Object.values(isTweet)[0];

      const data = {
        ...tweetCommentData,
      };

      data.userId = id;
      data.tweetId = tweetId;
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
