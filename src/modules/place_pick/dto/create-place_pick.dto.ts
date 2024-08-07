import { PickType } from '@nestjs/swagger';
import { PlacePick } from '../entities/place_pick.entity';
import { PlPickCategory } from '../../pl_pick_category/entities/pl_pick_category.entity';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreatePlaceDto } from '../../place/dto/create-place.dto';

export class PlacePickCategoryDto extends PickType(PlPickCategory, ['id'] as const) {}

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
  @Type(() => CreatePlaceDto)
  place: CreatePlaceDto;

  @Expose()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PlacePickDto)
  placePick: PlacePickDto;
}
