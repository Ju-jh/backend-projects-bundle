import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/tweet.dto';
import { Tweet } from './entities/tweet_cd.entity';

@Injectable()
export class TweetCdService {
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
}
