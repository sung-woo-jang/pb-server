import { PickType } from '@nestjs/swagger';
import { Post } from '../entities';

export class DeletePostDto extends PickType(Post, ['id'] as const) {}
