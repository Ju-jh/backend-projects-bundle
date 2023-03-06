import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/tweet_user/dto/user.dto';
import { User } from 'src/tweet_user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);
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
        id: user.id,
        email: user.user_email,
        tweetId: user.tweetId,
      },
    };
    const access_token = this.jwtService.sign(payload);

    return access_token;
  }

  async findByEmail(data): Promise<User> {
    const isUser = await this.userRepository.findOne({
      where: { user_email: data },
    });
    return isUser;
  }

  decodeToken(token): any {
    const decodedToken = this.jwtService.decode(token);
    return decodedToken['user'];
  }

  parseToken(cookie: string): any {
    const splitedToken = cookie.split('%20')[1];
    return this.decodeToken(splitedToken);
  }
}
