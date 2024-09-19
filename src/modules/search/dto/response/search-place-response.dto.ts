import { PickType } from '@nestjs/swagger';
import { Place } from '../../../place/entities/place.entity';

export class SearchPlaceResponseDto extends PickType(Place, [
  'id',
  'title',
  'address',
  'road_address',
  'description',
  'telephone',
  'mapx',
  'mapy',
  'placeCategory',
] as const) {}
