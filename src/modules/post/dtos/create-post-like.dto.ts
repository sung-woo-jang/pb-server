// import { PartialType } from '@nestjs/swagger';
// import { Transform, Type } from 'class-transformer';
// import { Post } from '../entities/post.entity';

// export class CreatePostLikeDto extends PartialType(Post) {
//   @Transform(({ value }) => parseInt(value, 10))
//   id: number;
// }

import { PickType } from '@nestjs/swagger';
import { Post } from '../entities';

export class CreatePostLikeDto extends PickType(Post, ['id'] as const) {}
