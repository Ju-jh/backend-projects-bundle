import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    console.log(user);

    if (
      user &&
      bcrypt.compare(user.password, await bcrypt.hash(password, 10))
    ) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: CreateUserDto): Promise<string> {
    const payload = { email: userDto.email };
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async register(userDto: CreateUserDto): Promise<any> {
    const { email, nickname, password } = userDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      email,
      nickname,
      password: hashedPassword,
    });
    await createdUser.save();
    const { password: _, ...result } = createdUser.toJSON();
    return result;
  }

  decodeToken(token: string): any {
    const decodedToken = this.jwtService.decode(token);
    return decodedToken['user'];
  }

  parseToken(cookie: string): any {
    const token = cookie?.split(' ')[1];
    if (!token) {
      return null;
    }
    const decodedToken = this.decodeToken(token);
    return decodedToken;
  }
}
