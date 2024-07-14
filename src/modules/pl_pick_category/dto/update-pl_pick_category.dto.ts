import { PartialType } from '@nestjs/mapped-types';
import { CreatePlPickCategoryDto } from './create-pl_pick_category.dto';

export class UpdatePlPickCategoryDto extends PartialType(CreatePlPickCategoryDto) {}
