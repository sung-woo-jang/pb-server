import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class ToggleLikeResponseDto {
  @Expose()
  @IsString()
  message: string;
}
