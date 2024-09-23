import { PickType } from '@nestjs/swagger';
import { PlacePick } from '../../entities/place_pick.entity';
import { ArrayMinSize, IsArray, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreatePlacePickDto extends PickType(PlacePick, ['memo', 'alias', 'link', 'place_id'] as const) {
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @Expose()
  pl_pick_category_ids: number[];
}
