import { Entity, ManyToOne } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsString } from 'class-validator';
import { Post } from '../../post/entities';

@Entity()
export class Comment extends BaseEntityIncrement {
  @IsString()
  comment: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;
}
