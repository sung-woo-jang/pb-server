import { ApiProperty, PickType } from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto extends PickType(Comment, ['comment'] as const) {
  @ApiProperty({
    required: true,
    description: '게시물 PK',
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  post_id: number;

  @ApiProperty({
    required: true,
    description: '유저 PK',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  author_account: string;
}
