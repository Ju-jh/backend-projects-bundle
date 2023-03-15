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
  async sendCode(
    @Body() verifyEmailDto: VerifyEmailDto,
    @Res() res: FastifyReply,
  ) {
    const result = await this.userService.handleEmail(verifyEmailDto);
    res.status(result.statusCode).send(result);
  }

  @Post('verifying')
  async verifyCode(
    @Body() verifyEmailCodeDto: VerifyEmailCodeDto,
    @Res() res: FastifyReply,
  ) {
    const result = await this.userService.handleVerifying(verifyEmailCodeDto);
    res.status(result.statusCode).send(result);
  }

  @Post('verified')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: FastifyReply,
  ) {
    const result = await this.userService.handleVerified(createUserDto);
    res.status(result.statusCode).send(result);
  }
}
