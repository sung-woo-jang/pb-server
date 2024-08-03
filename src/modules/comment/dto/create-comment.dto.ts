import { ApiProperty, PickType } from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';

export class CreateCommentDto extends PickType(Comment, ['comment'] as const) {
  @ApiProperty({
    required: true,
    description: '게시물 PK',
  })
  post_id: number;

  @ApiProperty({
    required: true,
    description: '유저 PK',
  })
  author_account: string;
}
