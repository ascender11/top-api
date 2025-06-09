import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from 'src/common/base.model';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth extends BaseModel {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
