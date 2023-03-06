import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TweetComment } from './entities/tweet_comment.entity';
import { TweetCommentController } from './tweet_comment.controller';
import { TweetCommentService } from './tweet_comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([TweetComment]), AuthModule],
  controllers: [TweetCommentController],
  providers: [TypeOrmModule, TweetCommentService],
  exports: [TweetCommentService],
})
export class TweetCommentModule {}
