import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(dto: AuthDto): Promise<UserDocument> {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
