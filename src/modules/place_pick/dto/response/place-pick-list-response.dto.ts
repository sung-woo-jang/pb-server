import { PickType } from '@nestjs/swagger';
import { PlPickCategory } from '../../../pl_pick_category/entities/pl_pick_category.entity';
import { Place } from '../../../place/entities/place.entity';
import { PlaceCategory } from '../../../place/entities/place_category.entity';
import { PlacePick } from '../../entities/place_pick.entity';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';

class PlPickCategoryDto extends PickType(PlPickCategory, ['id', 'title', 'memo'] as const) {}

export class PlaceCategoryDto extends PickType(PlaceCategory, [
  'id',
  'createdAt',
  'place_category_name',
  'place_category_name_detail',
] as const) {}
class PlaceDto extends PickType(Place, [
  'title',
  'address',
  'road_address',
  'description',
  'telephone',
  'mapy',
  'mapx',
] as const) {
  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PlaceCategoryDto)
  placeCategory: PlaceCategoryDto;
}

export class PlacePickListResponseDto extends PickType(PlacePick, [
  'place_id',
  'memo',
  'link',
  'alias',
  'createdAt',
] as const) {
  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PlaceDto)
  place: PlaceDto;

  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PlPickCategoryDto)
  plPickCategory: PlPickCategoryDto;
}
