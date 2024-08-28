import { PickType } from '@nestjs/swagger';
import { PlacePick } from '../../entities/place_pick.entity';

export class AllPlacePickListResponseDto extends PickType(PlacePick, [
  'place_id',
  'place',
  'plPickCategory',
] as const) {}
