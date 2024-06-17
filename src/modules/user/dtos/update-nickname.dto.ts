import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateNicknameDto {
  @ApiProperty({
    example: '장발장',
    description: '변경할 사용자 닉네임',
  })
  @IsString()
  nickname: string;
}
