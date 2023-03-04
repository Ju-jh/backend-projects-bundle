import { Module } from '@nestjs/common';
import { TweetBookmarkController } from './tweet_bookmark.controller';
import { TweetBookmarkService } from './tweet_bookmark.service';

@Module({
  controllers: [TweetBookmarkController],
  providers: [TweetBookmarkService]
})
export class TweetBookmarkModule {}
