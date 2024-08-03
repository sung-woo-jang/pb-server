import { Entity, ManyToOne, Unique } from 'typeorm';
import { BaseEntityIncrementNoTimestamp } from '@common/entities/base.entity';
import { Expose } from 'class-transformer';
import { User } from '../../user/entities';
import { Post } from './post.entity';

@Entity()
@Unique(['user', 'post'])
export class UserPostLike extends BaseEntityIncrementNoTimestamp {
  @Expose()
  @ManyToOne(() => User, (user) => user.likedPosts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Expose()
  @ManyToOne(() => Post, (post) => post.likedByUsers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post: Post;
}
