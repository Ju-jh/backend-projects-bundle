import { Module } from '@nestjs/common';
import { TweetLikeController } from './tweet_like.controller';
import { TweetLikeService } from './tweet_like.service';

@Module({
  controllers: [TweetLikeController],
  providers: [TweetLikeService]
})
export class TweetLikeModule {}
