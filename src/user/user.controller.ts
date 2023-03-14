import { Controller, Post, Body, Response } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { VerifyEmailCodeDto } from './dto/verifyEmailCode.dto';
import { UserService } from './user.service';
import { FastifyReply } from 'fastify';

@Controller('signup')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('email')
  async verifyEmail(
    @Body() verifyEmailDto: VerifyEmailDto,
    @Response() response: FastifyReply,
  ): Promise<{ message: string }> {
    const result = await this.userService.sendingCodeToEmail(verifyEmailDto);
    if (result.message.includes('발송')) {
      response.status(201).send(result);
    } else {
      response.status(400).send(result);
    }
    return result;
  }

  @Post('verifying')
  async verifyEmailCode(
    @Body() verifyEmailCodeDto: VerifyEmailCodeDto,
    @Response() response: FastifyReply,
  ) {
    const result = await this.userService.verifyingCode(verifyEmailCodeDto);
    if (result.message.includes('완료')) {
      response.status(200).send(result);
    } else {
      response.status(400).send(result);
    }
  }

  @Post('verified')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Response() response: FastifyReply,
  ) {
    const result = await this.userService.creatingUser(createUserDto);
    if (result.message.includes('완료')) {
      response.status(201).send(result);
    } else {
      response.status(400).send(result);
    }
  }
}
