import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet_cd.entity';
import { TweetCdController } from './tweet_cd.controller';
import { TweetCdService } from './tweet_cd.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  controllers: [TweetCdController],
  providers: [TypeOrmModule, TweetCdService],
  exports: [TweetCdService],
})
export class TweetCdModule {}
