import { Module } from '@nestjs/common';
import { TweetSocketGateway } from './tweet_soket.gateway';

@Module({
  providers: [TweetSocketGateway],
})
export class TweetSoketModule {}
