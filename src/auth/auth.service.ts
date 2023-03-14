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

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) {
      return false;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  }

  validateEmail(email: string): boolean {
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

  async decodeToken(token: string): Promise<any> {
    const decodedToken = this.jwtService.decode(token);
    return decodedToken['user'];
  }

  async parseToken(cookie: string): Promise<any> {
    const splitedToken = cookie.split('%20')[1];
    return this.decodeToken(splitedToken);
  }

  async validateLoginUser(
    loginUserDto: LoginUserDto,
  ): Promise<{ message: string }> {
    const isUser = await this.findByEmail(loginUserDto.email);
    if (!isUser) {
      return { message: '이메일 혹은 패스워드를 찾을 수 없습니다.' };
    }
    const isPassword = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (isPassword === false) {
      return { message: '이메일 혹은 패스워드를 찾을 수 없습니다.' };
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<{ message: string }> {
    const isEmailValid = this.validateEmail(loginUserDto.email);
    if (!isEmailValid) {
      return { message: '올바른 이메일 형식이 아닙니다.' };
    }
    const isUser = await this.findByEmail(loginUserDto.email);
    if (!isUser) {
      return { message: '이메일 혹은 패스워드를 찾을 수 없습니다.' };
    }
    const isPassword = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (isPassword === false) {
      return { message: '이메일 혹은 패스워드를 찾을 수 없습니다.' };
    }
    return { message: 'AMUWIKI에 오신걸 환영합니다.' };
  }

  async deleteUser(
    email: string,
    deleteUserDto: DeleteUserDto,
  ): Promise<{ message: string }> {
    const user = await this.findByEmail(email);
    if (!user) {
      return { message: '사용자를 찾을 수 없습니다.' };
    }
    const isPasswordValid = await bcrypt.compare(
      deleteUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return { message: '비밀번호가 올바르지 않습니다.' };
    }
    const deletedUser = await this.userModel.findOneAndDelete({ email });
    if (!deletedUser) {
      return { message: '사용자 삭제에 실패했습니다.' };
    }
    const deletedvalidateEmail = await this.verifiedEmail.findOneAndDelete({
      email,
    });
    if (!deletedvalidateEmail) {
      return { message: '이메일 인증 정보 삭제에 실패했습니다.' };
    }
    return { message: '사용자 삭제에 성공했습니다.' };
  }
}
