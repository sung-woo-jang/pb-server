import { PickType } from '@nestjs/swagger';
import { PlaceCategory } from '../entities/place_category.entity';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreatePlaceCategoryDto extends PickType(PlaceCategory, [] as const) {
  @IsNotEmpty()
  @Expose()
  category: string;
}
