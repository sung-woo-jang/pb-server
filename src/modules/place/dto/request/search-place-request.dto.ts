import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchPlaceRequestDto {
  @ApiProperty({ description: '검색 키워드', example: 'restaurant' })
  @IsString()
  @Expose()
  keyword: string;

  @ApiProperty({ description: '결과 제한 수', example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Expose()
  limit?: number = 10;

  @ApiProperty({ description: '결과 오프셋', example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Expose()
  offset?: number = 0;

  @ApiProperty({ description: '현재 위치의 X 좌표', example: 1266540756, required: false })
  @IsOptional()
  @IsNumber()
  @Expose()
  mapx?: number;

  @ApiProperty({ description: '현재 위치의 Y 좌표', example: 374665222, required: false })
  @IsOptional()
  @IsNumber()
  @Expose()
  mapy?: number;
}
