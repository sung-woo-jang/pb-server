import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Post } from '../entities';
import { CreateKeywordDto } from '../../keyword/dtos';
import { CreatePlaceDto } from '../../place/dto/create-place.dto';

export class CreatePostDto extends PickType(Post, ['content', 'visitDate', 'rate'] as const) {
  @Expose()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreatePlaceDto)
  place: CreatePlaceDto;

  @Expose()
  @IsOptional()
  @IsNumber()
  placeId: number;

  @ApiProperty({
    example: [{ keyword: '1' }, { keyword: '3' }, { keyword: '5' }, { keyword: '7' }],
    description: '선택한 키워드값 배열',
    isArray: true,
    type: CreateKeywordDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKeywordDto)
  keywords: CreateKeywordDto[];
}
