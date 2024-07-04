import { PickType } from '@nestjs/swagger';
import { Keyword } from '../entities';

export class CreateKeywordDto extends PickType(Keyword, ['keyword'] as const) {}
