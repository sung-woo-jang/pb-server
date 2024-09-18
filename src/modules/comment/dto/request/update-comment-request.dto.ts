import { PickType } from '@nestjs/swagger';
import { Comment } from '../../entities/comment.entity';

export class UpdateCommentRequestDto extends PickType(Comment, ['comment', 'id'] as const) {}
