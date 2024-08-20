import { PickType } from '@nestjs/swagger';
import { Place } from '../../entities/place.entity';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class SearchPlaceResponseDto extends PickType(Place, [
  'id',
  'title',
  'address',
  'road_address',
  'description',
  'telephone',
  'mapx',
  'mapy',
  'createdAt',
] as const) {
  @Expose()
  @IsNumber()
  similarity: number;
}
