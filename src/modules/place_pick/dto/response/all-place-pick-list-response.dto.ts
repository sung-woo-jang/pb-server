import { Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

export class AllPlacePickListResponseDto {
  @Expose()
  @IsArray()
  coords: [number, number][];
}
