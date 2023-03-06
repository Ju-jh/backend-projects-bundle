import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Headers,
} from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/auth.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { EditCommentDto } from './dto/editComment.dto';
import { TweetComment } from './entities/tweet_comment.entity';
import { TweetCommentService } from './tweet_comment.service';

@Controller('tweet-comment')
export class TweetCommentController {
  constructor(
    private tweetCommentService: TweetCommentService,

    private authService: AuthService,
  ) {}

  @Post()
  createComment(
    @Headers('cookie') cookie,
    @Body() tweetCommentData: CreateCommentDto,
  ) {
    const info = this.authService.parseToken(cookie);
    console.log('@@@@@@@@', info);
    const userId = Object.values(info)[0];
    this.tweetCommentService.createComment(tweetCommentData, Number(userId));
    return { message: '댓글이 생성되었습니다.' };
  }

  // @Get()
  // getAllComment(): TweetComment[] {
  //   return this.tweetCommentService.getAllComment();
  // }

  // @Get('id')
  // getOneComment(@Param('id') tweetCommentId: number): TweetComment {
  //   return this.tweetCommentService.getOneComment(tweetCommentId);
  // }

  // @Delete('id')
  // deleteComment(@Param('id') tweetCommentId: number) {
  //   this.tweetCommentService.deleteComment(tweetCommentId);
  //   return { message: '댓글이 삭제되었습니다.' };
  // }

  // @Patch('id')
  // update(@Param('id') @Body() updateData: EditCommentDto) {
  //   this.tweetCommentService.updateComment(updateData);
  //   return { message: '댓글이 수정되었습니다.' };
  // }
}
