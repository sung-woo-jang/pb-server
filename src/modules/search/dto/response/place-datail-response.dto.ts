import { PickType } from '@nestjs/swagger';
import { Place } from '../../../place/entities/place.entity';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class getSearchPlaceDetailDto extends PickType(Place, [
  'id',
  'title',
  'address',
  'road_address',
  'post',
] as const) {
  @Expose()
  @IsNumber()
  total_posts: number;

  @Expose()
  @IsNumber()
  place_average_rate: number;
}
