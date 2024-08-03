import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TimestampEntity } from '@common/entities/timestamp.entity';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export enum FollowStatus {
  FOLLOW = '팔로우',
  BLOCKED = '차단',
}

@Entity({
  comment: '팔로우 / 팔로잉 관련 테이블',
})
export class Follow extends TimestampEntity {
  @PrimaryColumn({ comment: '팔로우 신청한 사람의 ID' })
  @IsString()
  @Expose()
  follower_account: string;

  @PrimaryColumn({ comment: '팔로우 신청을 받은(을) 사람의 ID' })
  @IsString()
  @Expose()
  following_account: string;

  @Column({
    type: 'enum',
    enum: FollowStatus,
    default: FollowStatus.FOLLOW,
    comment: '팔로우 상태를 나타냅니다.',
  })
  @Expose()
  status: FollowStatus;
}
