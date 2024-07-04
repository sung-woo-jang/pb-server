import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Post } from '../entities';
import { CreateKeywordDto } from '../../../modules/keyword/dtos';

export class CreatePostDto extends PickType(Post, ['content', 'visitDate', 'rate'] as const) {
  @ApiProperty({ example: ['이미지'], description: '업로드 이미지 배열', isArray: true })
  @IsArray()
  imageList: any[];

  @ApiProperty({
    example: ['1', '5', '7', '4'],
    description: '선택한 키워드값 배열',
    isArray: true,
    type: () => CreateKeywordDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKeywordDto)
  keywords: CreateKeywordDto[];
}
