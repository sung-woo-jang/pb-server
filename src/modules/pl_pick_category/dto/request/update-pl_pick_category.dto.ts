import { PickType } from '@nestjs/swagger';
import { PlPickCategory } from '../../entities/pl_pick_category.entity';

export class UpdatePlPickCategoryDto extends PickType(PlPickCategory, [
  'id',
  'title',
  'picker_color',
  'memo',
  'link',
] as const) {}
