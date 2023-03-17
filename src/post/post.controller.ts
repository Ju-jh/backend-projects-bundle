import { Controller, Put, Delete, Res } from '@nestjs/common';
import { Body, Headers, Post } from '@nestjs/common/decorators';
import { CreatePostDto } from './dto/createPost.dto';
import { EditPostDto } from './dto/editPost.dto';
import { PostService } from './post.service';
import { FastifyReply } from 'fastify';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(
    @Headers('cookie') cookie: string,
    @Body() createPostDto: CreatePostDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.postService.detoken(cookie);
    await this.postService.createPost(createPostDto, email);
    res.send({ message: '게시글이 생성되었습니다.' });
  }

  @Put()
  async editPost(
    @Headers('cookie') cookie,
    @Body() editPostDto: EditPostDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.postService.detoken(cookie);
    this.postService.editPost(email, editPostDto);
    res.send({ message: '게시글이 수정되었습니다.' });
  }

  @Delete()
  async deletePost(@Headers('cookie') cookie, @Res() res: FastifyReply) {
    const email = await this.postService.detoken(cookie);
    this.postService.deletePost(email);
    res.send({ message: '게시글이 삭제되었습니다.' });
  }
}
