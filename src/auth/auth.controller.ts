import { Body, Controller, Headers, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DeleteUserDto } from './dto/deleteUser.dto';
import { FastifyReply } from 'fastify';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Response({ passthrough: true }) res,
    @Response() response: FastifyReply,
  ): Promise<{ message: string }> {
    const result = await this.authService.loginUser(loginUserDto);
    if (result.message.includes('환영')) {
      const isUser = await this.authService.findByEmail(loginUserDto.email);
      const isLogin = await this.authService.login(isUser);
      res.cookie('Authentication', `Bearer ${isLogin}`, {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
      });
      response.status(200).send(result);
    } else {
      response.status(401).send(result);
    }
    return result;
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
