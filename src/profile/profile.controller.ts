import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Res,
  Req,
  Put,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from 'src/auth/auth.service';
import { CreateProfileDto } from './dto/createProfile.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  @Post()
  async createProfile(
    @Headers('cookie') cookie,
    @Body() profiledata: CreateProfileDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.profileService.detoken(cookie);
    res.send(
      await this.profileService.createProfile(String(email), profiledata),
    );
  }

  @Get()
  async getBasicProfile(@Headers('cookie') cookie, @Res() res: FastifyReply) {
    const email = await this.profileService.detoken(cookie);
    res.send(await this.profileService.getBasicProfile(String(email)));
  }

  @Get('/detail')
  async getDetailProfile(@Headers('cookie') cookie, @Res() res: FastifyReply) {
    const email = await this.profileService.detoken(cookie);
    res.send(await this.profileService.getEditProfile(String(email)));
  }

  @Put('/edit')
  async editProfile(
    @Headers('cookie') cookie,
    @Body() updateData: EditProfileDto,
    @Res() res: FastifyReply,
  ) {
    const email = await this.profileService.detoken(cookie);
    res.send(await this.profileService.editProfile(String(email), updateData));
  }

  @Post('/upload')
  async uploadFile(
    @Headers('cookie') cookie,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply<any>,
  ): Promise<any> {
    const email = await this.profileService.detoken(cookie);
    return await this.profileService.uploadFile(String(email), req, res);
  }
}
