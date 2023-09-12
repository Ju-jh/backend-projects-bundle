import {
  Body,
  Controller,
  Delete,
  Headers,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DeleteUserDto } from './dto/deleteuser.dto';
import { FastifyReply } from 'fastify';
import { LoginUserDto } from './dto/loginuser.dto';
import { VerifyEmailDto } from './dto/verifyemail.dto';
import { VerifyEmailCodeDto } from './dto/verifyemailcode.dto';
import { UserService } from 'src/user/user.service';
import { ChangePasswordDto } from './dto/changepassword.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto, @Res() res: FastifyReply) {
    const result = await this.authService.handleLogin(dto);
    res.send(result);
  }

  @Post('email')
  async sendCode(@Body() dto: VerifyEmailDto, @Res() res: FastifyReply) {
    const result = await this.userService.helpEmailServie(dto);
    res.send(result);
  }

  @Post('verifying')
  async verifyCode(@Body() dto: VerifyEmailCodeDto, @Res() res: FastifyReply) {
    const result = await this.userService.handleVerifying(dto);
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

  @Put('changepassword')
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @Res() res: FastifyReply,
  ) {
    const result = await this.authService.handleChangePassword(dto);
    res.send(result);
  }
}
