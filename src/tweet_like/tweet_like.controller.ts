import { Controller } from '@nestjs/common';
import { TweetLikeService } from './tweet_like.service';
import { Delete, Post, Body, Param } from '@nestjs/common/decorators';
import { TweetLikeDto } from './dto/tweet.dto';

@Controller('tweet-like')
export class TweetLikeController {
  constructor(readonly tweetLikeService: TweetLikeService) {}

  @Post('/:id')
  createTweetLike(@Body() userData: TweetLikeDto) {
    this.tweetLikeService.likeTweet(userData);
    return { message: '트윗 좋아요를 눌렀습니다.' };
  }

  @Delete('/:id')
  deleteTweetLike(@Param('id') userData: number) {
    this.tweetLikeService.unlikeTweet(userData);
    return { message: '트윗 좋아요를 취소하였습니다.' };
  }
}
