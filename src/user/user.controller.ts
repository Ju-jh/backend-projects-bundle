import { Controller, Post, Body } from '@nestjs/common';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { UserService } from './user.service';

@Controller('signup')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    const isEmailValid = this.userService.validateEmail(verifyEmailDto.email);
    if (!isEmailValid) {
      return { message: '올바른 이메일 형식이 아닙니다.' };
    }
    const isEmailExist = await this.userService.isEmailExist(
      verifyEmailDto.email,
    );
    if (isEmailExist) {
      return { message: '이미 존재하는 이메일입니다.' };
    }
    const emailVerificationCode = this.userService.sendEmailVerificationCode(
      verifyEmailDto.email,
    );
    emailVerificationCode;
    return {
      message: '이메일 인증 코드가 발송되었습니다. 인증 코드를 입력하세요.',
    };
  }
}
