import { PickType } from '@nestjs/swagger';
import { PlacePick } from '../entities/place_pick.entity';
import { PlaceCategory } from '../../place/entities/place_category.entity';
import { Place } from '../../place/entities/place.entity';
import { PlPickCategory } from '../../pl_pick_category/entities/pl_pick_category.entity';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class PlacePickCategoryDto extends PickType(PlPickCategory, ['id'] as const) {}
export class PlaceDto extends PickType(Place, [
  'title',
  'address',
  'road_address',
  'description',
  'telephone',
  'mapx',
  'mapy',
] as const) {}
export class PlaceCategoryDto extends PickType(PlaceCategory, [
  'place_category_name_detail',
  'place_category_name',
] as const) {}
export class PlacePickDto extends PickType(PlacePick, ['memo', 'alias', 'link'] as const) {}

export class CreatePlacePickDto {
  @Expose()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PlacePickCategoryDto)
  plPickCategory: PlacePickCategoryDto;

  @Expose()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PlaceDto)
  place: PlaceDto;

  @Expose()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PlaceCategoryDto)
  placeCategory: PlaceCategoryDto;

  @Expose()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PlacePickDto)
  placePick: PlacePickDto;
}
