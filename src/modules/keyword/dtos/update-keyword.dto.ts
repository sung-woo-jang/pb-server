import { ApiProperty, PickType } from '@nestjs/swagger';
import { Keyword } from '../entities';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateKeywordDto extends PickType(Keyword, ['keyword'] as const) {
  @ApiProperty({
    example: 152,
    description: 'ID',
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Expose()
  id: number;
}
