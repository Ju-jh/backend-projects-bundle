import { Body, Controller, Delete, Headers, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DeleteUserDto } from './dto/deleteuser.dto';
import { FastifyReply } from 'fastify';
import { LoginUserDto } from './dto/loginuser.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto, @Res() res: FastifyReply) {
    const result = await this.authService.handleLogin(dto);
    res.send(result);
  }

  @Delete('withdrawal')
  async withdrawl(
    @Headers('cookie') cookie: string,
    @Body() dto: DeleteUserDto,
    @Res() res: FastifyReply,
  ) {
    const result = await this.authService.handleWithdrawal(cookie, dto);
    res.send(result);
  }
}
