import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/createTweet.dto';
import { BasicTweetDto } from './dto/basicTweet.dto';
import { Tweet } from './entities/tweet.entity';
import { plainToClass } from 'class-transformer';
import { EditTweetDto } from './dto/editTweet.dto';
import { DetailTweetDto } from './dto/detailTweet.dto';

@Injectable()
export class TweetPostService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}

  async createTweet(
    tweetData: CreateTweetDto,
    userId: number,
  ): Promise<CreateTweetDto> {
    try {
      const data = {
        ...tweetData,
      };
      data.userId = userId;
      return await this.tweetRepository.save(data);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllTweet(): Promise<BasicTweetDto[]> {
    const isUser = await this.tweetRepository.find();
    return plainToClass(BasicTweetDto, isUser);
  }

  async getOneTweet(userId: number): Promise<DetailTweetDto[]> {
    const isUser = await this.tweetRepository.find({
      where: { userId: userId },
    });
    return plainToClass(DetailTweetDto, isUser);
  }

  async editTweet(tweetId: number, data: EditTweetDto) {
    const isUser = await this.tweetRepository.update({ id: tweetId }, data);
    return plainToClass(EditTweetDto, isUser);
  }

  async deleteTweet(tweetId: number) {
    return await this.tweetRepository.delete(tweetId);
  }
}
