import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common/decorators';
import { User } from 'src/tweet_user/entities/user.entity';
import { CreateTweetDto } from './dto/tweet.dto';
import { TweetCdService } from './tweet_cd.service';

@Controller('tweetcd')
export class TweetCdController {
  constructor(readonly tweetCdService: TweetCdService) {}

  // @Get()
  // getAllUser() {
  //   return 'get All User';
  // }

  // @Get(':id')
  // getOne(@Param('id') id: string) {
  //   return `get User with the id ${id}`;
  // }

  @Post()
  createTweetPost(@Body() userData: CreateTweetDto) {
    return this.tweetCdService.createTweet(userData);
  }

  // @Delete('id')
  // removeUser(@Param('id') userData: User) {
  //   return ``;
  // }
}
