import { Controller } from '@nestjs/common';
import { Body, Headers, Post } from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/auth.service';
import { CreatePostDto } from './dto/createPost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private authService: AuthService,
  ) {}

  @Post()
  async createPost(@Headers('cookie') cookie, @Body() postData: CreatePostDto) {
    const info = await this.authService.parseToken(cookie);
    const email = Object.values(info)[0];
    console.log('#############', info);
    console.log('@@@@@@@@', typeof email);
    this.postService.createPost(postData, email);
    return { message: '게시글이 생성되었습니다.' };
  }
}
