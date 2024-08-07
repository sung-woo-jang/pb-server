import { PickType } from '@nestjs/swagger';
import { Post } from '../../../post/entities';

export class NewsfeedDto extends PickType(Post, [] as const) {}
