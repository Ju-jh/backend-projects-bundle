import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/tweet.dto';
import { ReadTweetDto } from './dto/tweet_r.dto';
import { Tweet } from './entities/tweet_cd.entity';

@Injectable()
export class TweetPostService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}
  async createTweet(data: CreateTweetDto): Promise<CreateTweetDto> {
    try {
      return await this.tweetRepository.save(data);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteTweet(id: number) {
    return await this.tweetRepository.delete(id);
  }

  async getAllTweet() {
    return await this.tweetRepository.find();
  }
  async getOneTweet(data: number): Promise<ReadTweetDto> {
    return await this.tweetRepository.findOne({ where: { id: data } });
  }
}
