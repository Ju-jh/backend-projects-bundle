import {
  Controller,
  Put,
  Delete,
  Res,
  Body,
  Headers,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { EditPostDto } from './dto/editPost.dto';
import { PostService } from './post.service';
import { FastifyReply } from 'fastify';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  async createPost(
    @Headers('cookie') cookie: string,
    @Body() dto: CreatePostDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.postService.detoken(cookie);
    await this.postService.createPost(email, dto);
    res.send({ message: '게시글이 생성되었습니다.', statusCode: 201 });
  }

  @Put('edit')
  async editPost(
    @Headers('cookie') cookie,
    @Body() dto: EditPostDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.postService.detoken(cookie);
    this.postService.editPost(email, dto);
    res.send({ message: '게시글이 수정되었습니다.', statusCode: 201 });
  }

  @Delete('delete')
  async deletePost(@Headers('cookie') cookie, @Res() res: FastifyReply) {
    const email = await this.postService.detoken(cookie);
    this.postService.deletePost(email);
    res.send({ message: '게시글이 삭제되었습니다.', statusCode: 200 });
  }
}
