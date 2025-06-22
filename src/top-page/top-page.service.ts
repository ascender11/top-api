import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPage, TopPageDocument } from './top-page.schema';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPage.name) private readonly topPageModel: Model<TopPageDocument>) {}

  async create(dto: CreateTopPageDto): Promise<TopPageDocument> {
    return this.topPageModel.create(dto);
  }

  async findById(id: string): Promise<TopPageDocument | null> {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string): Promise<TopPageDocument | null> {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory): Promise<TopPage[]> {
    return this.topPageModel.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto): Promise<TopPageDocument | null> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteById(id: string): Promise<TopPageDocument | null> {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }
}
