import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Post } from '../entities';
import { UpdateKeywordDto } from '../../keyword/dtos';

export class UpdatePostDto extends PickType(Post, ['id', 'content', 'visitDate', 'rate'] as const) {
  @ApiProperty({ example: ['이미지'], description: '업로드 이미지 배열', isArray: true })
  @IsArray()
  imageList: any[];

  @ApiProperty({
    example: [
      { id: 2, keyword: '1' },
      { id: 5, keyword: '3' },
      { id: 3, keyword: '5' },
      { id: 9, keyword: '7' },
    ],
    description: '선택한 키워드값 배열',
    isArray: true,
    type: UpdateKeywordDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateKeywordDto)
  keywords: UpdateKeywordDto[];
}
