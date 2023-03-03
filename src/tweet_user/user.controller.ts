import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userdata: CreateUserDto) {
    this.userService.createUser(userdata);

    return { message: '트위터 계정이 생성되었습니다.' };
  }
}
