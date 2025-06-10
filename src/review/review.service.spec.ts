import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from '@nestjs/mongoose';
import { Review } from './review.schema';
import { Types } from 'mongoose';

describe('ReviewService', () => {
  let service: ReviewService;

  const mockReviewModel = {
    create: jest.fn(),
    findByIdAndDelete: jest.fn(),
    find: jest.fn(),
    deleteMany: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockReviewModel.find.mockReturnValue({ exec: jest.fn() });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getModelToken(Review.name),
          useValue: mockReviewModel,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('findByProductId работает', async () => {
    const id = new Types.ObjectId().toHexString();

    mockReviewModel.find().exec.mockResolvedValueOnce([{ productId: id }]);

    const result = await service.findByProductId(id);

    expect(mockReviewModel.find).toHaveBeenCalledWith({ productId: new Types.ObjectId(id) });
    expect(result[0].productId).toBe(id);
  });
});
