import { PickType } from '@nestjs/swagger';
import { PlacePick } from '../../entities/place_pick.entity';

export class DeletePlacePickRequestDto extends PickType(PlacePick, ['pl_pick_category_id', 'place_id'] as const) {}
