import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { ProfileSchema } from './schemas/profile.schema';
import { AmuwikiModule } from '../amuwiki/amuwiki.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { join } from 'path';
import fastifyStatic from 'fastify-static';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyMultipart } from '@fastify/multipart';
import { Multipart } from 'fastify-multipart';
import { VerifiedEmailSchema } from 'src/user/schemas/verifiedemail.schema';
import { Storage } from '@google-cloud/storage';
import { StorageModule } from './storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: 'Profile',
        schema: ProfileSchema,
      },
      {
        name: 'VerifiedEmail',
        schema: VerifiedEmailSchema,
      },
    ]),
    UserModule,
    AuthModule,
    AmuwikiModule,
    StorageModule,
  ],
  controllers: [ProfileController],
  providers: [MongooseModule, ProfileService, JwtService, UserService, Storage],
  exports: [ProfileService],
})
export class ProfileModule {
  static async setup(app: NestFastifyApplication) {
    app.register(fastifyStatic, {
      root: join(__dirname, '..', 'public'),
      prefix: '/public/',
    });
    app.register(fastifyMultipart);
    app.register(Multipart);
    await app.listen(process.env.PORT || 3000, '0.0.0.0');
  }
}
