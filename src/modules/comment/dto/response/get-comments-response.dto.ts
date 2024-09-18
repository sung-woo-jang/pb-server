import { ApiProperty, PickType } from '@nestjs/swagger';
import { Comment } from '../../entities/comment.entity';
import { User } from '../../../user/entities';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';

export class CommentUserDto extends PickType(User, ['id', 'name', 'nickname', 'profileImage']) {}

export class GetCommentsResponseDto extends PickType(Comment, ['id', 'comment', 'createdAt'] as const) {
  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @ApiProperty({
    type: () => CommentUserDto,
  })
  @Type(() => CommentUserDto)
  user: CommentUserDto;
}
