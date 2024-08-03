import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';

interface FollowParams {
  follower_account: string;
  following_account: string;
}

@Injectable()
export class FollowRepository extends Repository<Follow> {
  constructor(private dataSource: DataSource) {
    super(Follow, dataSource.createEntityManager());
  }

  // 팔로우 상태 조회
  async findExistingFollow({ follower_account, following_account }: FollowParams) {
    return await this.createQueryBuilder('follow')
      .withDeleted() // softDelete로 삭제된 데이터도 조회
      .where('follow.follower_account = :follower_account', { follower_account })
      .andWhere('follow.following_account = :following_account', { following_account })
      .getOne();
  }

  // 팔로우 추가
  async addFollow({ follower_account, following_account }: { follower_account: string; following_account: string }) {
    await this.createQueryBuilder().insert().into(Follow).values({ follower_account, following_account }).execute();
  }

  // 팔로우 복구
  async restoreFollow({ follower_account, following_account }: FollowParams) {
    await this.createQueryBuilder()
      .restore()
      .from(Follow)
      .where('follower_account = :follower_account', { follower_account })
      .andWhere('following_account = :following_account', { following_account })
      .execute();
  }

  // 팔로우 소프트 삭제 (언팔로우)
  async softDeleteFollow({ follower_account, following_account }: FollowParams) {
    await this.createQueryBuilder()
      .softDelete()
      .from(Follow)
      .where('follower_account = :follower_account', { follower_account })
      .andWhere('following_account = :following_account', { following_account })
      .execute();
  }
}
