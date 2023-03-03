import { Injectable } from '@nestjs/common';
import { UserService } from '../tweet_user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/tweet_user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (
      user &&
      bcrypt.compare(user.user_password, await bcrypt.hash(password, 10))
    ) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: CreateUserDto) {
    const payload = {
      user: {
        email: user.user_email,
      },
    };
    const access_token = this.jwtService.sign(payload);

    return access_token;
  }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }
}
