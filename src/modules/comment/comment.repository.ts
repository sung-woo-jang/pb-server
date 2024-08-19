import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async getComments(postId: number) {
    return await this.createQueryBuilder('comment')
      .select(['comment.id', 'comment.comment', 'comment.createdAt'])
      .leftJoin('comment.user', 'user')
      .addSelect(['user.profileImage', 'user.name', 'user.nickname', 'user.id'])
      .where('comment.post_id = :postId', { postId })
      .getMany();
  }
}
