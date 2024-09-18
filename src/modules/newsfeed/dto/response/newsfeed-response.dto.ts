import { PickType } from '@nestjs/swagger';
import { Keyword } from '../../../keyword/entities';
import { Place } from '../../../place/entities/place.entity';
import { Image } from '../../../post/entities/image.entity';
import { Post } from '../../../post/entities';
import { IsArray, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PlaceCategoryDto } from '../../../place_pick/dto/response/place-pick-list-response.dto';

class NewsfeedKeywordDto extends PickType(Keyword, ['id', 'keyword'] as const) {}

class NewsfeedPlaceDto extends PickType(Place, [
  'id',
  'title',
  'address',
  'road_address',
  'description',
  'telephone',
  'mapy',
  'mapx',
] as const) {
  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PlaceCategoryDto)
  placeCategory: PlaceCategoryDto;
}

class ImageDto extends PickType(Image, ['createdAt', 'id', 'image_path'] as const) {}

export class NewsfeedResponseDto extends PickType(Post, [
  'createdAt',
  'id',
  'content',
  'visitDate',
  'rate',
  'likes',
  'user',
] as const) {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewsfeedKeywordDto)
  keywords: NewsfeedKeywordDto[];

  @Expose()
  @IsObject()
  @ValidateNested()
  @Type(() => NewsfeedPlaceDto)
  place: NewsfeedPlaceDto;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];
}
