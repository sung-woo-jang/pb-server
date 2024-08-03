import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsString } from 'class-validator';
import { Post } from '../../post/entities';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities';

@Entity()
export class Comment extends BaseEntityIncrement {
  @Column({ nullable: false })
  @IsString()
  @ApiProperty({
    required: true,
    description: '댓글 내용',
    example: '나도 가보고 싶네요.',
  })
  comment: string;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false, onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false, onDelete: 'CASCADE' })
  user: User;
}
