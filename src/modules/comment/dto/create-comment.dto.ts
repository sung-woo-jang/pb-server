import { ApiProperty, PickType } from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';

export class CreateCommentDto extends PickType(Comment, ['comment'] as const) {
  @ApiProperty()
  post_id: number;

  @ApiProperty()
  author_account: string;
}
