import { PickType } from '@nestjs/swagger';
import { Place } from '../entities/place.entity';

export class CreatePlaceDto extends PickType(Place, [
  'title',
  'address',
  'road_address',
  'description',
  'telephone',
  'mapx',
  'mapy',
] as const) {}
