import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'user_email',
      passwordField: 'user_password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const isUser = await this.authService.validateUser(username, password);
    if (!isUser) {
      throw new UnauthorizedException();
    }
    return isUser;
  }
}
