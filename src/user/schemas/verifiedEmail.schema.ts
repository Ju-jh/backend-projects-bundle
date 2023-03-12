import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VerifiedEmailDocument = VerifiedEmail & Document;

@Schema()
export class VerifiedEmail {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const VerifiedEmailSchema = SchemaFactory.createForClass(VerifiedEmail);
