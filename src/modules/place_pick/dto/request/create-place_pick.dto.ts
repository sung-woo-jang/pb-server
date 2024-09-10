import { PickType } from '@nestjs/swagger';
import { PlacePick } from '../../entities/place_pick.entity';

export class CreatePlacePickDto extends PickType(PlacePick, [
  'memo',
  'alias',
  'link',
  'pl_pick_category_id',
  'place_id',
] as const) {}
