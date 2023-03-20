import {
  Controller,
  Put,
  Delete,
  Res,
  Body,
  Get,
  Headers,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createpost.dto';
import { EditPostDto } from './dto/editpost.dto';
import { PostService } from './post.service';
import { FastifyReply } from 'fastify';
import { AuthService } from 'src/auth/auth.service';
import { AmuwikiService } from 'src/amuwiki/amuwiki.service';
import { DeletePostDto } from './dto/deletepost.dto';

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
    const result = await this.amuwikiService.findMyPosts(email);
    res.send(result);
  }

  @Post('create')
  async createPost(
    @Headers('cookie') cookie: string,
    @Body() dto: CreatePostDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.postService.detoken(cookie);
    this.postService.createPost(email, dto);
    res.send({ message: '게시글이 생성되었습니다.', statusCode: 201 });
  }

  @Put('edit')
  async editPost(
    @Headers('cookie') cookie,
    @Body() dto: EditPostDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.postService.detoken(cookie);
    const result = await this.postService.editPost(email, dto);
    res.status(result.statusCode).send(result);
  }

  @Delete('delete')
  async deletePost(
    @Headers('cookie') cookie,
    @Res() res: FastifyReply,
    @Body() dto: DeletePostDto,
  ) {
    const email = await this.postService.detoken(cookie);
    const result = await this.postService.deletePost(email, dto);
    res.status(result.statusCode).send(result);
  }
}
