import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class VerifiedEmail extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  createdAt: Date;
}

export const VerifiedEmailSchema = SchemaFactory.createForClass(VerifiedEmail);
