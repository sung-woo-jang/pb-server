import { PickType } from '@nestjs/swagger';
import { Post } from '../entities';

export class PostDto extends PickType(Post, [
  'id',
  'content',
  'visitDate',
  'rate',
  'user',
  'images',
  'place',
  'keywords',
  'comments',
  'likes',
  'createdAt',
] as const) {}
