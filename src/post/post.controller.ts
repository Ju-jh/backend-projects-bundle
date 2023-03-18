import { Controller, Put, Delete, Res } from '@nestjs/common';
import { Body, Get, Headers, Post } from '@nestjs/common/decorators';
import { CreatePostDto } from './dto/createPost.dto';
import { EditPostDto } from './dto/editPost.dto';
import { PostService } from './post.service';
import { FastifyReply } from 'fastify';
import { AuthService } from 'src/auth/auth.service';
import { AmuwikiService } from 'src/amuwiki/amuwiki.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService,
    private readonly amuwikiService: AmuwikiService,
  ) {}

  @Get('mypost')
  async findMyPost(
    @Headers('cookie') cookie: string,
    @Res() res: FastifyReply,
  ) {
    const email = await this.authService.cookieToEmail(cookie);
    const nickname = await this.postService.getNickname(email);
    const result = await this.amuwikiService.findMyPosts(nickname);
    res.send(result);
  }

  @Post('create')
  async createPost(
    @Headers('cookie') cookie: string,
    @Body() createPostDto: CreatePostDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.postService.detoken(cookie);
    this.postService.createPost(createPostDto, email);
    res.send({ message: '게시글이 생성되었습니다.' });
  }

  @Put('edit')
  async editPost(
    @Headers('cookie') cookie,
    @Body() editPostDto: EditPostDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.postService.detoken(cookie);
    this.postService.editPost(email, editPostDto);
    res.send({ message: '게시글이 수정되었습니다.' });
  }

  @Delete('delete')
  async deletePost(@Headers('cookie') cookie, @Res() res: FastifyReply) {
    const email = await this.postService.detoken(cookie);
    this.postService.deletePost(email);
    res.send({ message: '게시글이 삭제되었습니다.' });
  }
}
