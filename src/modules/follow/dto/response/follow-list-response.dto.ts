import { PickType } from '@nestjs/swagger';
import { Follow } from '../../entities/follow.entity';
import { Expose, Type } from 'class-transformer';

export class FollowDto extends PickType(Follow, [
  'following_account',
  'follower_account',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'status',
] as const) {}

export class FollowListResponseDto {
  @Type(() => FollowDto)
  @Expose()
  followings: FollowDto[];

  @Type(() => FollowDto)
  @Expose()
  followers: FollowDto[];
}
