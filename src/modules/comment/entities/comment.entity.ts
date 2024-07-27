import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsString } from 'class-validator';
import { Post } from '../../post/entities';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities';

@Entity()
export class Comment extends BaseEntityIncrement {
  @Column()
  @IsString()
  @ApiProperty()
  comment: string;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false, onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false, onDelete: 'CASCADE' })
  user: User;
}
