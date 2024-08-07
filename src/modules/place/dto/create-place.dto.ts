import { PickType } from '@nestjs/swagger';
import { Place } from '../entities/place.entity';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreatePlaceCategoryDto } from './create-place_category.dto';

export class CreatePlaceDto extends PickType(Place, [
  'title',
  'address',
  'road_address',
  'description',
  'telephone',
  'mapx',
  'mapy',
] as const) {
  @Expose()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreatePlaceCategoryDto)
  placeCategory: CreatePlaceCategoryDto;
}
