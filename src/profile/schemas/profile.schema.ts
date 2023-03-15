import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Profile {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  nickname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  phoneNumber: number;

  @Prop()
  photo: string;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
