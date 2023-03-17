import { Body, Controller, Get, Headers, Res, Put, Req } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { EditNicknameDto } from './dto/editNickname.dto';
import { EditPasswordDto } from './dto/editPassword.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getDetailProfile(@Headers('cookie') cookie, @Res() res: FastifyReply) {
    res.send(await this.profileService.handleGetProfile(cookie));
  }

  @Put('nickname')
  async editNickname(
    @Headers('cookie') cookie,
    @Body() dto: EditNicknameDto,
    @Res() res: FastifyReply,
  ) {
    const result = await this.profileService.handleEditNickname(cookie, dto);
    res.status(result.statusCode).send(result);
  }

  @Put('password')
  async editPassword(
    @Headers('cookie') cookie,
    @Body() dto: EditPasswordDto,
    @Res() res: FastifyReply,
  ) {
    const result = await this.profileService.handleEditPassword(cookie, dto);
    res.status(result.statusCode).send(result);
  }

  @Put('upload')
  async editimage(
    @Headers('cookie') cookie,
    @Res() res: FastifyReply,
    @Req() req: FastifyRequest,
  ) {
    const result = await this.profileService.handleUploadImage(cookie, req);
    res.status(result.statusCode).send(result);
  }
}
