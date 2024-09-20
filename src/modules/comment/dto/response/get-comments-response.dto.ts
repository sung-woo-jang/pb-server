import { ApiProperty, PickType } from '@nestjs/swagger';
import { Comment } from '../../entities/comment.entity';
import { User } from '../../../user/entities';
import { Expose } from 'class-transformer';

export class GetCommentsResponseDto extends PickType(Comment, ['id', 'comment', 'createdAt'] as const) {
  @Expose()
  @ApiProperty({
    type: PickType(User, ['id', 'name', 'nickname', 'profileImage']),
  })
  user: Pick<User, 'id' | 'name' | 'nickname' | 'profileImage'>;
}
