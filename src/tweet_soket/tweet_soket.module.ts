import { Module } from '@nestjs/common';
import { TweetSoketController } from './tweet_soket.controller';

@Module({
  controllers: [TweetSoketController]
})
export class TweetSoketModule {}
