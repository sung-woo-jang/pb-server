import { PickType } from '@nestjs/swagger';
import { Place } from '../../entities/place.entity';

export class PlacePickInfoRequestDto extends PickType(Place, ['mapx', 'mapy'] as const) {}
