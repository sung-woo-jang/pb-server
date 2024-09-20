import { ApiProperty } from '@nestjs/swagger';

class ErrorDetail {
  @ApiProperty({ example: '로그인된 사용자 정보가 없습니다.' })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 401 })
  statusCode: number;
}

export class UnAuthorizedResponseDto {
  @ApiProperty({ example: 401 })
  status: number;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;

  @ApiProperty({ example: false })
  isLogin: boolean;

  @ApiProperty({ type: ErrorDetail })
  error?: ErrorDetail;
}

export class ErrorBaseResponseSchema {
  @ApiProperty({ type: 'number', example: 404 })
  status: number;

  @ApiProperty({ type: 'string', example: 'Not Found' })
  message: string;

  @ApiProperty({ type: 'boolean', example: true })
  isLogin: boolean;

  @ApiProperty({
    type: 'object',
    example: {
      message: '요청한 리소스를 찾을 수 없습니다.',
      error: 'Not Found',
      statusCode: 404,
    },
    description: '에러에 대한 상세 정보',
  })
  error?: {
    message: string;
    error: string;
    statusCode: number;
  };
}
