import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Put,
  Get,
  Post,
  Headers,
} from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/auth.service';
import { CreateTweetDto } from './dto/createTweet.dto';
import { EditTweetDto } from './dto/editTweet.dto';
import { TweetPostService } from './tweet.service';

@Controller('tweet-post')
export class TweetPostController {
  constructor(
    private tweetService: TweetPostService,
    private authService: AuthService,
  ) {}
  @Post()
  createTweet(@Headers('cookie') cookie, @Body() tweetData: CreateTweetDto) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    console.log(userId);

    this.tweetService.createTweet(tweetData, +userId);
    return { message: '트윗이 생성되었습니다.' };
  }

  @Get()
  async getAllTweet(@Headers('cookie') cookie) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    return await this.tweetService.getAllTweet(+userId);
  }
  @Get('/detail')
  async getOneTweet(@Headers('cookie') cookie) {
    const info = this.authService.parseToken(cookie);
    return await this.tweetService.getOneTweet(info);
  }

  @Put()
  async editTweet(@Headers('cookie') cookie, @Body() updateData: EditTweetDto) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    await this.tweetService.editTweet(+userId, updateData);
    return { message: '트윗이 수정되었습니다.' };
  }

  @Delete()
  async deleteTweet(@Headers('cookie') cookie) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    await this.tweetService.deleteTweet(+userId);
    return { message: '트윗이 삭제되었습니다.' };
  }
}
