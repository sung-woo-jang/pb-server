import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsString } from 'class-validator';
import { Post } from '../../post/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment extends BaseEntityIncrement {
  @Column()
  @IsString()
  @ApiProperty()
  comment: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;
}
