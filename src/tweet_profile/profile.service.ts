import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/tweet_user/entities/user.entity';
import { Repository } from 'typeorm';
import { BasicProfileDto } from './dto/basicProfile.dto';
import { CreateProfileDto } from './dto/createProfile.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getBasicProfile() {
    return await this.profileRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async createProfile(
    profile: CreateProfileDto,
    id: number,
  ): Promise<CreateProfileDto> {
    try {
      const data = {
        ...profile,
      };
      data.userId = id;
      return await this.profileRepository.save(data);
    } catch (e) {
      console.log(e);
    }
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
