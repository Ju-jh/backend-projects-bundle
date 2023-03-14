import { Body, Controller, Headers, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DeleteUserDto } from './dto/deleteuser.dto';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Response({ passthrough: true }) res) {
    const isUser = await this.authService.findByEmail(body.email);
    if (!isUser) {
      return { message: '이메일 혹은 패스워드를 찾을 수 없습니다.' };
    }
    const isPassword = await this.authService.validateUser(
      body.email,
      body.password,
    );
    if (isPassword === false) {
      return { message: '이메일 혹은 패스워드를 찾을 수 없습니다.' };
    }
    const isLogin = await this.authService.login(isUser);
    res.cookie('Authentication', `Bearer ${isLogin}`, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
    return { message: 'AMUWIKI에 오신걸 환영합니다.' };
  }

  @Post('logout')
  async logout(@Response({ passthrough: true }) res) {
    res.header('Set-Cookie', [
      'Authentication=; Domain=localhost; Path=/; HttpOnly',
    ]);
    return { message: 'AMUWIKI에서 로그아웃 되었습니다.' };
  }

  @Post('withdrawl')
  async withdrawl(
    @Headers('cookie') cookie: string,
    @Body() deleteUserDto: DeleteUserDto,
    @Response() response: FastifyReply,
    @Response() res: FastifyReply,
  ): Promise<{ message: string }> {
    const info = await this.authService.parseToken(cookie);
    const email = Object.values(info)[0];
    const result = await this.authService.deleteUser(
      String(email),
      deleteUserDto,
    );
    res.header('Set-Cookie', [
      'Authentication=; Domain=localhost; Path=/; HttpOnly',
    ]);
    if (result.message.includes('성공')) {
      response.status(200).send(result);
    } else {
      response.status(400).send(result);
    }
    return result;
  }
}
