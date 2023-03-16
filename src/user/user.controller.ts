import { Controller, Post, Body, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { VerifyEmailCodeDto } from './dto/verifyEmailCode.dto';
import { UserService } from './user.service';
import { FastifyReply } from 'fastify';

@Controller('signup')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('email')
  async sendCode(@Body() dto: VerifyEmailDto, @Res() res: FastifyReply) {
    const result = await this.userService.handleEmail(dto);
    res.status(result.statusCode).send(result);
  }

  @Post('verifying')
  async verifyCode(@Body() dto: VerifyEmailCodeDto, @Res() res: FastifyReply) {
    const result = await this.userService.handleVerifying(dto);
    res.status(result.statusCode).send(result);
  }

  @Post('verified')
  async createUser(@Body() dto: CreateUserDto, @Res() res: FastifyReply) {
    const result = await this.userService.handleVerified(dto);
    res.status(result.statusCode).send(result);
  }
}
