import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { VerifyEmailCodeDto } from './dto/verifyEmailCode.dto';
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
    const isEmailExist = await this.userService.isEmailExistinVerified(
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

  @Post('verifying')
  async verifyEmailCode(@Body() verifyEmailCodeDto: VerifyEmailCodeDto) {
    const isCodeValid = await this.userService.verifyEmail(
      verifyEmailCodeDto.email,
      verifyEmailCodeDto.code,
    );
    if (!isCodeValid) {
      return { message: '이메일 인증 코드가 유효하지 않습니다.' };
    }
    this.userService.saveVerifiedEmail(verifyEmailCodeDto);
    return { message: '이메일 인증이 완료되었습니다.' };
  }

  @Post('verified')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const isEmailValid = this.userService.validateEmail(createUserDto.email);
    if (!isEmailValid) {
      return { message: '올바른 이메일 형식이 아닙니다.' };
    }
    const isEmailExist = await this.userService.isEmailExist(
      createUserDto.email,
    );
    if (isEmailExist) {
      return { message: '이미 존재하는 이메일입니다.' };
    }
    const isEmailVerified = await this.userService.isEmailExistinVerified(
      createUserDto.email,
    );
    if (isEmailVerified === false) {
      return { message: '인증되지 않은 이메일입니다.' };
    }
    const isNicknameExist = await this.userService.isNicknameExist(
      createUserDto.nickname,
    );
    if (isNicknameExist) {
      return { message: '이미 존재하는 닉네임입니다.' };
    }
    const isNicknameValid = this.userService.validateNickname(
      createUserDto.nickname,
    );
    if (!isNicknameValid) {
      return {
        message:
          '닉네임은 5자 이상 10자 이하, 영문자,숫자,한글만 사용할 수 있습니다.',
      };
    }
    const isPasswordValid = this.userService.validatePassword(
      createUserDto.password,
    );
    if (!isPasswordValid) {
      return {
        message:
          '비밀번호는 8자 이상 20자 이하, 영문자,숫자,특수문자를 포함해야합니다.',
      };
    }
    this.userService.createUser(createUserDto);
    return { message: 'AMUWIKI 회원가입이 완료되었습니다.' };
  }
}
