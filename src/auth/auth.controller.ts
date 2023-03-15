import {
  Body,
  Controller,
  Delete,
  Headers,
  Post,
  Res,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DeleteUserDto } from './dto/deleteUser.dto';
import { FastifyReply } from 'fastify';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: FastifyReply) {
    const result = await this.authService.handleLogin(loginUserDto, res);
    res.status(result.statusCode).send(result);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: FastifyReply) {
    res
      .header('Set-Cookie', [
        'Authentication=; Domain=localhost; Path=/; HttpOnly',
      ])
      .send({ message: 'AMUWIKI에서 로그아웃 되었습니다.', statusCode: 200 });
  }

  @Delete('withdrawal')
  async withdrawl(
    @Headers('cookie') cookie: string,
    @Body() deleteUserDto: DeleteUserDto,
    @Res() res: FastifyReply,
  ) {
    const result = await this.authService.handleWithdrawal(
      cookie,
      deleteUserDto,
      res,
    );
    res.status(result.statusCode).send(result);
  }
}
