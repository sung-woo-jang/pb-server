// 없을 수 있음
import { PickType } from '@nestjs/swagger';
import { Like } from '../../../like/entities/like.entity';
import { Keyword } from '../../../keyword/entities';
import { Place } from '../../../place/entities/place.entity';
import { Image } from '../../../post/entities/image.entity';
import { Post } from '../../../post/entities';
import { IsArray, IsNotEmpty, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { UserDto } from '../../../user/dtos';
import { Expose, Type } from 'class-transformer';
import { PlaceCategoryDto } from '../../../place_pick/dto/response/place-pick-list-response.dto';

class LikeDto extends PickType(Like, ['post_id', 'user_id', 'createdAt'] as const) {}

class KeywordDto extends PickType(Keyword, ['id', 'keyword'] as const) {}

class PlaceDto extends PickType(Place, [
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

export class NewsfeedResponseDto extends PickType(Post, ['createdAt', 'id', 'content', 'visitDate', 'rate'] as const) {
  @Expose()
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LikeDto)
  likes: LikeDto[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KeywordDto)
  keywords: KeywordDto[];

  // @Expose()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CommentDto)
  // comments: CommentDto[];

  @Expose()
  @IsObject()
  @ValidateNested()
  @Type(() => PlaceDto)
  place: PlaceDto;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];
}
