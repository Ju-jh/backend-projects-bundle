import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Tweet } from 'src/tweet_post/entities/tweet.entity';
import { TweetComment } from './entities/tweet_comment.entity';
import { TweetCommentController } from './tweet_comment.controller';
import { TweetCommentService } from './tweet_comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([TweetComment, Tweet]), AuthModule],
  controllers: [TweetCommentController],
  providers: [TypeOrmModule, TweetCommentService],
  exports: [TweetCommentService],
})
export class TweetCommentModule {}
