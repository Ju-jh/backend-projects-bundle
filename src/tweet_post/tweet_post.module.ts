import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet_cd.entity';
import { TweetPostController } from './tweet_post.controller';
import { TweetPostService } from './tweet_post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  controllers: [TweetPostController],
  providers: [TypeOrmModule, TweetPostService],
  exports: [TweetPostService],
})
export class TweetPostModule {}
