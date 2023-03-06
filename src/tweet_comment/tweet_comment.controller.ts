import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Headers,
  Put,
} from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/auth.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { EditCommentDto } from './dto/editComment.dto';
import { TweetCommentService } from './tweet_comment.service';

@Controller('tweetcomment')
export class TweetCommentController {
  constructor(
    private tweetCommentService: TweetCommentService,

    private authService: AuthService,
  ) {}

  @Post('/:tweetId')
  createComment(
    @Headers('cookie') cookie,
    @Param('tweetId') tweetId,
    @Body() tweetCommentData: CreateCommentDto,
  ) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    this.tweetCommentService.createComment(tweetCommentData, +userId, +tweetId);
    return { message: '댓글이 생성되었습니다.' };
  }

  @Get()
  async getAllComment() {
    return await this.tweetCommentService.getAllComment();
  }

  @Get('/:tweetId')
  async getOneComment(@Param('tweetId') tweetId) {
    return await this.tweetCommentService.getOneComment(+tweetId);
  }

  @Put('/:tweetId')
  async editComment(
    @Param('tweetId') tweetId,
    @Body() updateData: EditCommentDto,
  ) {
    await this.tweetCommentService.editComment(+tweetId, updateData);
    return { message: '댓글이 수정되었습니다.' };
  }

  @Delete('/:tweetId')
  async deleteComment(@Param('tweetId') tweetId) {
    await this.tweetCommentService.deleteComment(+tweetId);
    return { message: '댓글이 삭제되었습니다.' };
  }
}
