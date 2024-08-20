import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeRepository extends Repository<Like> {
  constructor(private dataSource: DataSource) {
    super(Like, dataSource.createEntityManager());
  }

  // 좋아요 여부 확인
  async findExistingLike(like: Like): Promise<Like | null> {
    return await this.findOne({ where: like });
  }

  // 좋아요 추가
  async addLike(like: Like): Promise<void> {
    await this.createQueryBuilder().insert().values(like).execute();
  }

  // 좋아요 삭제 (취소)
  async removeLike(like: Like): Promise<void> {
    await this.delete(like);
  }

  async getLikesForPost(post_id: number) {
    return await this.createQueryBuilder('like')
      .select('COUNT(like.user_id)', 'likeCount')
      .where('like.post_id = :post_id', { post_id })
      .getRawOne();
  }
}
