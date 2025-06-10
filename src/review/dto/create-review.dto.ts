import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @IsString({ message: 'Заголовок должен быть строкой' })
  title: string;

  @IsString({ message: 'Описание должно быть строкой' })
  description: string;

  @Min(1, { message: 'Рейтинг не может быть менее 1' })
  @Max(5, { message: 'Рейтинг не может быть более 5' })
  @IsNumber({}, { message: 'Рейтинг должен быть числом' })
  rating: number;

  @IsString({ message: 'ID продукта должен быть строкой' })
  productId: string;
}
