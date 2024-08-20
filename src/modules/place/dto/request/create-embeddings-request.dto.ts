import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateEmbeddingsRequestDto {
  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  category: string;

  @IsString()
  @Expose()
  address: string;

  @IsString()
  @Expose()
  roadAddress: string;
}
