import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationRequestDto } from '@common/dto/request/pagination-request.dto';

class CoordinateDto {
  @ApiProperty({ description: '현재 위치의 X 좌표', example: 126.654075, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => (value === '' ? undefined : Number(value)))
  mapx?: number;

  @ApiProperty({ description: '현재 위치의 Y 좌표', example: 37.466522, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => (value === '' ? undefined : Number(value)))
  mapy?: number;
}

export class SearchPlaceRequestDto extends IntersectionType(CoordinateDto, PaginationRequestDto) {
  @ApiProperty({ description: '검색 키워드', example: 'restaurant' })
  @IsString()
  @Expose()
  @Transform(({ value }) => decodeURIComponent(value))
  keyword: string;
}
