import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { BasicProfileDto } from './dto/basicProfile.dto';
import { CreateProfileDto } from './dto/createProfile.dto';
import { DetailProfileDto } from './dto/detailProfile.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

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

  async getBasicProfile(options: {
    id: number;
    email: string;
  }): Promise<BasicProfileDto> {
    const isUser = await this.profileRepository.findOne({
      where: { userId: options.id },
    });
    return plainToClass(BasicProfileDto, isUser);
  }

  async getEditProfile(options: {
    id: number;
    email: string;
  }): Promise<DetailProfileDto> {
    const isUser = await this.profileRepository.findOne({
      where: { userId: options.id },
    });
    return plainToClass(DetailProfileDto, isUser);
  }

  async editProfile(id: number, data: EditProfileDto) {
    return await this.profileRepository.update({ userId: id }, data);
  }
}
