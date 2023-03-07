import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Tweet } from './entities/tweet.entity';
import { Bookmark } from './entities/tweetBookmark.entity';
import { Like } from './entities/tweetLike.entity';
import { TweetPostController } from './tweet.controller';
import { TweetPostService } from './tweet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, Bookmark, Like]), AuthModule],
  controllers: [TweetPostController],
  providers: [TypeOrmModule, TweetPostService],
  exports: [TweetPostService],
})
export class TweetPostModule {}
