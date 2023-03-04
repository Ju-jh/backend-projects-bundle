import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import exp from 'constants';
import { UserController } from 'src/tweet_user/user.controller';
import { CreateProfileDto } from './dto/createProfile.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  @Get('')
  async getBasicProfile(): Promise<Profile[]> {
    return this.profileService.getBasicProfile();
  }

  @Post()
  createProfile(@Request() req, @Body() profiledata: CreateProfileDto) {
    const token = req.cookies.Authentication;
    const splitedToken = token.split(' ')[1];
    const decodedToken = this.jwtService.decode(splitedToken);
    console.log('@@@@@@@@@@@@@@@@', decodedToken);
    const userId = Object.entries(decodedToken)[0][1].id;
    console.log('################', userId);
    this.profileService.createProfile(profiledata, userId);
    return { message: '프로필 정보가 등록되었습니다.' };
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
