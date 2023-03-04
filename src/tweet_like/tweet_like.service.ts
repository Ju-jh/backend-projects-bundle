import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TweetLikeDto } from './dto/tweet.dto';
import { Tweet } from './entities/tweet_cd.entity';

@Injectable()
export class TweetLikeService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}
  async likeTweet(data: TweetLikeDto): Promise<TweetLikeDto> {
    return await this.tweetRepository.save(data);
  }

  async unlikeTweet(id: number) {
    return await this.tweetRepository.delete(id);
  }
}
