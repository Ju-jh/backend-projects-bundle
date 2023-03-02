import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log(await bcrypt.hash(pass, 10));
    if (
      user &&
      bcrypt.compare(user.user_password, await bcrypt.hash(pass, 10))
    ) {
      const { user_password, ...result } = user;
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
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }
}
