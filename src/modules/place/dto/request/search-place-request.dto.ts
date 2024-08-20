import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchPlaceRequestDto {
  @ApiProperty({ description: '검색 키워드', example: 'restaurant' })
  @IsString()
  @Expose()
  keyword: string;

  @ApiProperty({
    description:
      '결과 제한 수. 한 번의 요청에서 반환할 최대 결과 개수를 지정합니다. ' +
      '페이지네이션 구현이나 대량의 데이터 처리 시 유용합니다. ' +
      '기본값은 10이며, 서버 부하 관리를 위해 적절한 값을 설정하는 것이 좋습니다.',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value || 10)
  @IsNumber()
  @Expose()
  limit?: number;

  @ApiProperty({
    description:
      '결과 오프셋. 검색 결과의 시작 위치를 지정합니다. ' +
      '페이지네이션 구현 시 페이지 번호와 함께 사용됩니다. ' +
      '예를 들어, limit이 10이고 offset이 20이면 21번째부터 30번째 결과를 반환합니다. ' +
      '대량의 데이터를 순차적으로 조회할 때 유용하며, 기본값은 0입니다.',
    example: 0,
    required: false,
  })
  @Transform(({ value }) => value || 0)
  @IsOptional()
  @IsNumber()
  @Expose()
  offset?: number;

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
