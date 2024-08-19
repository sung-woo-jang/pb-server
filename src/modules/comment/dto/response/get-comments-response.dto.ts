import { PickType } from '@nestjs/swagger';
import { Comment } from '../../entities/comment.entity';
import { User } from '../../../user/entities';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';

class UserDto extends PickType(User, ['id', 'nickname', 'name', 'profileImage'] as const) {}

export class GetCommentsResponseDto extends PickType(Comment, ['id', 'comment', 'createdAt'] as const) {
  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
