import { PickType } from '@nestjs/swagger';
import { Keyword } from '../entities';

export class KeywordDto extends PickType(Keyword, ['id', 'keyword'] as const) {}
