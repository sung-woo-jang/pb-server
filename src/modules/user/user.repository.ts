import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getTimelineList(userId: string) {
    // TODO 1: 대표사진 한 장만 가져오도록 수정
    return await this.createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.email', 'user.nickname', 'user.profileImage'])
      .leftJoin('user.posts', 'post')
      .addSelect(['post.id'])
      .leftJoin('post.images', 'image')
      .addSelect(['image.id', 'image.image_path', 'image.createdAt'])
      .where('user.id = :userId', { userId })
      .orderBy('post.createdAt', 'DESC')
      .getOne();
  }
}
