import { PickType } from '@nestjs/swagger';
import { Post } from '../entities';

export class FindPostDto extends PickType(Post, ['id'] as const) {}
