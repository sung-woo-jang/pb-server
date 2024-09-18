import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { Post } from '../../post/entities';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities';
import { Expose, Type } from 'class-transformer';

@Entity()
export class Comment extends BaseEntityIncrement {
  @Column({ nullable: false })
  @IsString()
  @Expose()
  @ApiProperty({
    required: true,
    description: '댓글 내용',
    example: '나도 가보고 싶네요.',
  })
  comment: string;

  @Expose()
  @ValidateNested()
  @ApiProperty({
    type: () => Post,
  })
  @Type(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, { nullable: false, onDelete: 'CASCADE' })
  post: Post;

  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @ApiProperty({
    type: () => User,
  })
  @Type(() => User)
  @ManyToOne(() => User, (user) => user.comments, { nullable: false, onDelete: 'CASCADE' })
  user: User;
}
