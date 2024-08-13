import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class LikesCountResponseDto {
  @Expose()
  @IsNumber()
  likeCount: number;
}
