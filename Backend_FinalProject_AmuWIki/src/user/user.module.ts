import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import fastifyStatic from 'fastify-static';
import { VerifiedEmailSchema } from './schemas/verifiedemail.schema';
import { ProfileSchema } from 'src/profile/schemas/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'VerifiedEmail',
        schema: VerifiedEmailSchema,
      },
      {
        name: 'Profile',
        schema: ProfileSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  static async setup(app: NestFastifyApplication) {
    app.register(fastifyStatic, {
      root: join(__dirname, '..', 'public'),
      prefix: '/public/',
    });

    await app.listen(process.env.PORT || 3000, '0.0.0.0');
  }
}
