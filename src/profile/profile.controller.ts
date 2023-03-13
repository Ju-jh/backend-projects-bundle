import { Controller, Get, Headers } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ProfileService } from './profile.service';
@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  @Get()
  async getBasicProfile(@Headers('cookie') cookie) {
    const info = await this.authService.parseToken(cookie);
    return await this.profileService.getBasicProfile(info);
  }

  @Get('/detail')
  async getDetailProfile(@Headers('cookie') cookie) {
    const info = await this.authService.parseToken(cookie);
    return await this.profileService.getEditProfile(info);
  }
}
