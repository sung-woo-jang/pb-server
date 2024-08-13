import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { UserCategoriesResponseDto } from './user-categories-response.dto';
import { PickType } from '@nestjs/swagger';
import { PlacePick } from '../../../place_pick/entities/place_pick.entity';

class PlacePickDto extends PickType(PlacePick, [
  'createdAt',
  'pl_pick_category_id',
  'place_id',
  'memo',
  'alias',
  'link',
] as const) {}
export class PlPickCategoryWithPlacePickDto extends UserCategoriesResponseDto {
  @Expose()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PlacePickDto)
  placePicks: PlacePickDto[];
}
