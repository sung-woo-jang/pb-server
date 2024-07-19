import { PickType } from '@nestjs/swagger';
import { Post } from '../../entities';

export class NewsfeedDto extends PickType(Post, [] as const) {}
