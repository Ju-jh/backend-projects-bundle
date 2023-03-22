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
import { DetailPostDto } from './dto/detailpost.dto';

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

  @Post('detail')
  async getDetailPost(@Body() dto: DetailPostDto, @Res() res: FastifyReply) {
    const result = await this.postService.getDetailPost(dto);
    res.send(result);
  }

  @Post()
  async createPost(
    @Headers('cookie') cookie: string,
    @Body() dto: CreatePostDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.postService.detoken(cookie);
    const result = this.postService.createPost(email, dto);
    res.send(result);
  }

  @Put()
  async editPost(
    @Headers('cookie') cookie,
    @Body() dto: EditPostDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.postService.detoken(cookie);
    const result = await this.postService.editPost(email, dto);
    res.send(result);
  }

  @Delete()
  async deletePost(@Body() dto: DeletePostDto, @Res() res: FastifyReply) {
    const result = await this.postService.deletePost(dto);
    res.send(result);
  }
}
