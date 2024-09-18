import { PickType } from '@nestjs/swagger';
import { Place } from '../../entities/place.entity';

export class CreatePlaceRequestDto extends PickType(Place, [
  'title',
  'address',
  'road_address',
  'description',
  'telephone',
  'mapx',
  'mapy',
] as const) {
  // @Expose()
  // @ValidateNested()
  // @IsNotEmpty()
  // @Type(() => CreatePlaceCategoryDto)
  // placeCategory: CreatePlaceCategoryDto;
}
