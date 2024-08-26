import { PickType } from '@nestjs/swagger';
import { Post } from '../../entities';

export class CreatePostResponseDto extends PickType(Post, ['id', 'user'] as const) {}
