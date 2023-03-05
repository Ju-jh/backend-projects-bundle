import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common/decorators';
import { CreateTweetDto } from './dto/tweet.dto';
import { Tweet } from './entities/tweet_cd.entity';
import { TweetPostService } from './tweet_post.service';

@Controller('tweet-post')
export class TweetPostController {
  constructor(readonly tweetCdService: TweetPostService) {}

  @Get()
  getAllTweet(): Promise<Tweet[]> {
    return this.tweetCdService.getAllTweet();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.tweetCdService.getOneTweet(id);
  }

  @Post()
  createTweetPost(@Body() userData: CreateTweetDto) {
    return this.tweetCdService.createTweet(userData);
  }

  @Delete('/:id')
  removeTweetPost(@Param('id') userData: number) {
    this.tweetCdService.deleteTweet(userData);
    return { message: '트윗이 삭제되었습니다.' };
  }
}
