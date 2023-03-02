import { Module } from '@nestjs/common';
import { TweetRService } from './tweet_r.service';

@Module({
  providers: [TweetRService]
})
export class TweetRModule {}
