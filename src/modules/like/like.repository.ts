import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Like } from './entities/like.entity';

interface LikeParams {
  user_id: string;
  post_id: number;
}

@Injectable()
export class LikeRepository extends Repository<Like> {
  constructor(private dataSource: DataSource) {
    super(Like, dataSource.createEntityManager());
  }

  // 좋아요 여부 확인
  async findExistingLike(user_id: string, post_id: number): Promise<Like | null> {
    return await this.createQueryBuilder('like')
      .where('like.user_id = :user_id', { user_id })
      .andWhere('like.post_id = :post_id', { post_id })
      .getOne();
  }

  // 좋아요 추가
  async addLike({ post_id, user_id }: LikeParams): Promise<void> {
    await this.createQueryBuilder().insert().values({ user_id, post_id }).execute();
  }

  // 좋아요 삭제 (취소)
  async removeLike({ post_id, user_id }: LikeParams): Promise<void> {
    await this.createQueryBuilder()
      .delete()
      .where('user_id = :user_id', { user_id })
      .andWhere('post_id = :post_id', { post_id })
      .execute();
  }
}
