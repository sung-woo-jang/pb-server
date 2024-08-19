import { PickType } from '@nestjs/swagger';
import { PlPickCategory } from '../../entities/pl_pick_category.entity';

export class UserCategoriesResponseDto extends PickType(PlPickCategory, [
  'id',
  'placePicks',
  'createdAt',
  'title',
  'picker_color',
  'memo',
  'link',
] as const) {}
