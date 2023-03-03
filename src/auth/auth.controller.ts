import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const isLogin = await this.authService.login(req);
    res.cookie('Authentication', `Bearer ${isLogin}`);
    return { message: '트위터에 오신걸 환영합니다.' };
  }

  @Post('logout')
  async logout(@Response({ passthrough: true }) res) {
    res.cookie('Authentication', '');
    return { message: '트위터에서 로그아웃 되었습니다.' };
  }
}
