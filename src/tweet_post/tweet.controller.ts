import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Put,
  Get,
  Post,
  Headers,
  Param,
} from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/auth.service';
import { CreateTweetDto } from './dto/createTweet.dto';
import { EditTweetDto } from './dto/editTweet.dto';
import { TweetPostService } from './tweet.service';

@Controller('tweetpost')
export class TweetPostController {
  constructor(
    private tweetService: TweetPostService,
    private authService: AuthService,
  ) {}

  @Post()
  createTweet(@Headers('cookie') cookie, @Body() tweetData: CreateTweetDto) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    this.tweetService.createTweet(tweetData, +userId);
    return { message: '트윗이 생성되었습니다.' };
  }

  @Get()
  async getAllTweet() {
    return await this.tweetService.getAllTweet();
  }

  @Get('/detail')
  async getOneTweet(@Headers('cookie') cookie) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    return await this.tweetService.getOneTweet(+userId);
  }

  @Put('/:tweetId')
  async editTweet(@Param('tweetId') tweetId, @Body() updateData: EditTweetDto) {
    await this.tweetService.editTweet(+tweetId, updateData);
    return { message: '트윗이 수정되었습니다.' };
  }

  @Delete('/:tweetId')
  async deleteTweet(@Param('tweetId') tweetId) {
    await this.tweetService.deleteTweet(+tweetId);
    return { message: '트윗이 삭제되었습니다.' };
  }

  @Get('/bookmark')
  async getBookmark(@Headers('cookie') cookie) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    const myBookmark = await this.tweetService.getBookmark(+userId);
    const ismyBookmark = Object.values(myBookmark);
    const tweetIds = await this.tweetService.checkTweetId(ismyBookmark);
    const tweets = await this.tweetService.checkTweets(tweetIds);
    return tweets;
  }

  @Put('bookmark/:id')
  async addBookmark(@Headers('cookie') cookie, @Param('id') tweetid: number) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    const isBookmark = await this.tweetService.checkBookmark(tweetid, +userId);
    if (isBookmark == null) {
      await this.tweetService.addBookmark(tweetid, +userId);
      return { message: '북마크가 추가 되었습니다.' };
    }
    await this.tweetService.deleteBookmark(tweetid, +userId);
    return { message: '북마크가 취소 되었습니다.' };
  }

  @Put('like/:tweetId')
  async updateLike(
    @Headers('cookie') cookie,
    @Param('tweetId') tweetid: number,
  ) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    const isLike = await this.tweetService.checkLike(tweetid, +userId);
    if (isLike == null) {
      await this.tweetService.createLike(tweetid, +userId);
      const countLikes = await this.tweetService.countLikes(tweetid);
      await this.tweetService.updateLikes(tweetid, countLikes);
      return { message: '트윗의 좋아요를 등록하였습니다.' };
    } else if (isLike) {
      await this.tweetService.deleteLike(tweetid, +userId);
      const countLikes = await this.tweetService.countLikes(tweetid);
      await this.tweetService.updateLikes(tweetid, countLikes);
      return { message: '트윗의 좋아요를 해제하였습니다.' };
    }
  }
}
