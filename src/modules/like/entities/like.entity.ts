import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../../user/entities';
import { Post } from '../../post/entities';
import { IsNumber, IsString } from 'class-validator';

@Entity()
@Unique(['user', 'post'])
export class Like {
  @PrimaryColumn()
  @IsString()
  @Expose()
  user_id: string;

  @PrimaryColumn()
  @IsNumber()
  @Expose()
  post_id: number;

  @Expose()
  @ManyToOne(() => User, (user) => user.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Expose()
  @ManyToOne(() => Post, (post) => post.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post: Post;
}
