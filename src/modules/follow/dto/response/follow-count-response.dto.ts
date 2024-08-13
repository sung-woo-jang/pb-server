import { Expose } from 'class-transformer';

export class FollowCountResponseDto {
  @Expose()
  followings: number;

  @Expose()
  followers: number;
}
