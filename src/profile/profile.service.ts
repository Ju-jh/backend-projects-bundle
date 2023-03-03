import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicProfileDto } from './dto/basicProfile.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getBasicProfile() {
    return await this.profileRepository.find();
  }

  //   async getDtailProfile(email: string): Promise<EditProfileDto> {
  //     return await this.profileRepository.findOne({
  //       where: { user_email: email },
  //     });
  //   }

  //   async editPlofile(email: string, data: Partial<EditProfileDto>) {
  //     await this.profileRepository.update(data);
  //     return await this.profileRepository.findOne({ email });
  //   }
}
