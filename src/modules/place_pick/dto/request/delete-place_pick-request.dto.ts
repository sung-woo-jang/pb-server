import { PickType } from '@nestjs/swagger';
import { PlacePick } from '../../entities/place_pick.entity';

export class DeletePlacePickRequestDto extends PickType(PlacePick, ['place_id'] as const) {}
