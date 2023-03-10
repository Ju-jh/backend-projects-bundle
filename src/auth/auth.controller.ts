import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Response({ passthrough: true }) res) {
    const isUser = await this.authService.findByEmail(body.email);
    const isLogin = await this.authService.login(isUser);
    res.cookie('Authentication', `Bearer ${isLogin}`);
    return { message: 'AMUWIKI에 오신걸 환영합니다.' };
  }

  @Post('logout')
  async logout(@Response({ passthrough: true }) res) {
    res.cookie('Authentication', '');
    return { message: 'AMUWIKI에서 로그아웃 되었습니다.' };
  }
}
