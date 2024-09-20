import { ApiProperty } from '@nestjs/swagger';

export class SuccessBaseResponseSchema {
  @ApiProperty({ type: 'number', example: 200 })
  status: number;

  @ApiProperty({ type: 'string', example: 'OK' })
  message: string;

  @ApiProperty({ type: 'boolean', example: true })
  isLogin: boolean;
}
