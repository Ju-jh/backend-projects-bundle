import { Controller, Get } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('')
  async getBasicProfile(): Promise<Profile[]> {
    return this.profileService.getBasicProfile();
  }

  //   @Get(':id')
  //   async getDetailProfile(@Param('id') userId: number):  {
  //     return this.profileService.getDetailProfile(userId);
  //   }

  //   @Put(':id')
  //   async editProfile(@Param('id') userId: number, @Body() updateData: EditProfileDTO){
  //     return this.profileService.editProfile(userId, updateData);
  //   };
}
