import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review.schema';

@Module({
  controllers: [ReviewController],
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
})
export class ReviewModule {}
