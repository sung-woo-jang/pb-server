import { PickType } from '@nestjs/swagger';
import { PlPickCategory } from '../../entities/pl_pick_category.entity';

export class CreatePlPickCategoryDto extends PickType(PlPickCategory, [
  'title',
  'picker_color',
  'memo',
  'link',
] as const) {}
