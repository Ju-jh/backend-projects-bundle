import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<CreateUserDto> {
    try {
      await this.transformPassword(data);
      return await this.userRepository.save(data);
    } catch (e) {
      console.log(e);
    }
  }

  async transformPassword(user: CreateUserDto): Promise<void> {
    user.user_password = await bcrypt.hash(user.user_password, 10);
    return Promise.resolve();
  }
}
