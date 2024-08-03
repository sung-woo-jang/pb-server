import { PickType } from '@nestjs/swagger';
import { Post } from '../entities';

export class PostLikeDto extends PickType(Post, ['id'] as const) {}
