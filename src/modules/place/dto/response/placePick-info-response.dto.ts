import { PickType } from '@nestjs/swagger';
import { Place } from '../../entities/place.entity';

export class PlacePickInfoResponseDto extends PickType(Place, [
  'id',
  'title',
  'address',
  'road_address',
  'description',
  'telephone',
  'placeCategory',
]) {}
