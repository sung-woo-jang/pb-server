import { PickType } from '@nestjs/swagger';
import { Post } from '../../../post/entities';
import { UserDto } from '../../../user/dtos';
import { Image } from '../../../post/entities/image.entity';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

class ImageDto extends PickType(Image, ['id', 'image_path', 'createdAt']) {}

class PostDto extends PickType(Post, ['id'] as const) {
  @Expose()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];
}
export class TimelineListResponseDto extends PickType(UserDto, [
  'id',
  'email',
  'name',
  'nickname',
  'profileImage',
] as const) {
  @Expose()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PostDto)
  posts: PostDto[];
}
