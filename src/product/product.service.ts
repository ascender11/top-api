import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { Review } from 'src/review/review.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    return this.productModel.create(dto);
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<ProductDocument | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateProductDto): Promise<ProductDocument | null> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(
    dto: FindProductDto,
  ): Promise<(Product & { review: Review[]; reviewCount: number; reviewAvg: number })[]> {
    return this.productModel
      .aggregate([
        { $match: { categories: dto.category } },
        { $sort: { _id: 1 } },
        { $limit: dto.limit },
        {
          $lookup: {
            from: 'reviews',
            as: 'reviews',
            localField: '_id',
            foreignField: 'productId',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
            reviews: {
              $function: {
                body: `function (reviews) {
                  reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                  return reviews;
                }`,
                args: ['$reviews'],
                lang: 'js',
              },
            },
          },
        },
      ])
      .exec() as Promise<(Product & { review: Review[]; reviewCount: number; reviewAvg: number })[]>;
  }
}
