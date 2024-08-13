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
      .leftJoinAndSelect('user.posts', 'post')
      .leftJoinAndSelect('post.images', 'image')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.nickname',
        'user.profileImage',
        'post.id',
        // 'post.content',
        // 'post.visitDate',
        // 'post.rate',
        'image.id',
        'image.image_path',
      ])
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async findById(id: string): Promise<User> {
    return await this.findOneBy({ id });
  }
}
