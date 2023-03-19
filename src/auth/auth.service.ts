import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import {
  VerifiedEmail,
  VerifiedEmailDocument,
} from 'src/user/schemas/VerifiedEmail.schema';
import { DeleteUserDto } from './dto/deleteUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(VerifiedEmail.name)
    private verifiedEmail: Model<VerifiedEmailDocument>,
  ) {}

  async isValidateUser(email: string, password: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) {
      return false;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  }

  isValidateEmail(email: string): boolean {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  async login(userDto: CreateUserDto): Promise<string> {
    const payload = { user: { email: userDto.email } };
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async decodeToken(token: string): Promise<string> {
    const decodedToken = this.jwtService.decode(token);
    return decodedToken['user'];
  }

  async parseToken(cookie: string): Promise<string> {
    const splitedToken = cookie.split('%20')[1];
    return this.decodeToken(splitedToken);
  }

  async cookieToEmail(cookie: string): Promise<string> {
    const info = await this.parseToken(cookie);
    const email = Object.values(info)[0] as string;
    return email;
  }

  async getUser(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async loginUser(
    dto: LoginUserDto,
  ): Promise<{ message: string; statusCode: number }> {
    const isEmailValid = this.isValidateEmail(dto.email);
    if (!isEmailValid) {
      return { message: '올바른 이메일 형식이 아닙니다.', statusCode: 401 };
    }
    const isUser = await this.findByEmail(dto.email);
    if (!isUser) {
      return {
        message: '이메일 혹은 패스워드를 찾을 수 없습니다.',
        statusCode: 401,
      };
    }
    const isPassword = await this.isValidateUser(dto.email, dto.password);
    if (isPassword === false) {
      return {
        message: '이메일 혹은 패스워드를 찾을 수 없습니다.',
        statusCode: 401,
      };
    }
    return { message: 'AMUWIKI에 오신걸 환영합니다.', statusCode: 200 };
  }

  async deleteUser(
    email: string,
    dto: DeleteUserDto,
  ): Promise<{ message: string; statusCode: number }> {
    const user = await this.findByEmail(email);
    if (!user) {
      return { message: '사용자를 찾을 수 없습니다.', statusCode: 400 };
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      return { message: '비밀번호가 올바르지 않습니다.', statusCode: 400 };
    }
    const deletedUser = await this.userModel.findOneAndDelete({ email });
    if (!deletedUser) {
      return { message: '사용자 삭제에 실패했습니다.', statusCode: 400 };
    }
    const deletedvalidateEmail = await this.verifiedEmail.findOneAndDelete({
      email,
    });
    if (!deletedvalidateEmail) {
      return {
        message: '이메일 인증 정보 삭제에 실패했습니다.',
        statusCode: 400,
      };
    }
    return { message: '사용자 삭제에 성공했습니다.', statusCode: 200 };
  }

  async handleLogin(
    dto: LoginUserDto,
    res: any,
  ): Promise<{ message: string; statusCode: number }> {
    const result = await this.loginUser(dto);
    if (result.message.includes('환영')) {
      const isUser = await this.findByEmail(dto.email);
      const isLogin = await this.login(isUser);
      res.cookie('Authentication', `Bearer ${isLogin}`, {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
      });
    }
    return result;
  }

  async handleWithdrawal(
    cookie: string,
    dto: DeleteUserDto,
    res: any,
  ): Promise<{ message: string; statusCode: number }> {
    const email = await this.cookieToEmail(cookie);
    const result = await this.deleteUser(email, dto);
    if (result.statusCode === 200) {
      res
        .header('Set-Cookie', [
          'Authentication=; Domain=localhost; Path=/; HttpOnly',
        ])
        .status(result.statusCode)
        .send(result);
    }
    return result;
  }
}
