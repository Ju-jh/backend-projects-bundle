import { Controller, Post, Body, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { VerifyEmailDto } from './dto/verifyemail.dto';
import { VerifyEmailCodeDto } from './dto/verifyemailcode.dto';
import { UserService } from './user.service';
import { FastifyReply } from 'fastify';

@Controller('signup')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('email')
  async sendCode(@Body() dto: VerifyEmailDto, @Res() res: FastifyReply) {
    const result = await this.userService.handleEmail(dto);
    res.send(result);
  }

  @Post('verifying')
  async verifyCode(@Body() dto: VerifyEmailCodeDto, @Res() res: FastifyReply) {
    const result = await this.userService.handleVerifying(dto);
    res.send(result);
  }

  @Post('verified')
  async createUser(@Body() dto: CreateUserDto, @Res() res: FastifyReply) {
    const result = await this.userService.handleVerified(dto);
    res.send(result);
  }
}
