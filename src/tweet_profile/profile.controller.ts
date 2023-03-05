import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/createProfile.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { ProfileService } from './profile.service';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading';
import { diskStorage } from 'multer';

@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,

    private authService: AuthService,
  ) {}

  @Post()
  createProfile(
    @Headers('cookie') cookie,
    @Body() profiledata: CreateProfileDto,
  ) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    this.profileService.createProfile(profiledata, +userId);
    return { message: '프로필 정보가 등록되었습니다.' };
  }

  @Get()
  async getBasicProfile(@Headers('cookie') cookie) {
    const info = this.authService.parseToken(cookie);
    return await this.profileService.getBasicProfile(info);
  }

  @Get('/detail')
  async getDetailProfile(@Headers('cookie') cookie) {
    const info = this.authService.parseToken(cookie);
    return await this.profileService.getEditProfile(info);
  }

  @Put('/edit')
  async editProfile(
    @Headers('cookie') cookie,
    @Body() updateData: EditProfileDto,
  ) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    await this.profileService.editProfile(+userId, updateData);
    return { message: '프로필 정보가 변경되었습니다.' };
  }

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Put('upload')
  uploadImg(@UploadedFile() file, @Headers('cookie') cookie) {
    const info = this.authService.parseToken(cookie);
    const userId = Object.values(info)[0];
    this.profileService.uploadImg(+userId, file);
    return { message: '프로필 이미지가 업데이트 되었습니다.' };
  }

  @Get('/upload/:filename')
  seeUploadedFile(@Param('filename') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
