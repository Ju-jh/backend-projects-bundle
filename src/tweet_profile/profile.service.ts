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
    id: number,
    profile: CreateProfileDto,
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

  async uploadImg(id: number, file) {
    const test = Object.values(file)[5];
    const fileName = `upload/${test}`;
    const newProfile = await this.findByIdAndUpdateImg(id, fileName);
    return newProfile;
  }

  async findByIdAndUpdateImg(id: number, fileName: string) {
    const isUser = await this.profileRepository.findOne({
      where: { userId: id },
    });
    isUser.photo = `http://localhost:3001/profile/${fileName}`;
    return await this.profileRepository.save(isUser);
  }
}
