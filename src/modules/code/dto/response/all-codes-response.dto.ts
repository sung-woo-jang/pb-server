import { PickType } from '@nestjs/swagger';
import { CodeCategory } from '../../entities/code-category.entity';

export class AllCodesResponseDto extends PickType(CodeCategory, [
  'ctcCd',
  'ctcName',
  'sortOrder',
  'codeTypes',
] as const) {}
