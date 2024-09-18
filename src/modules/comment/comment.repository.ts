import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { UpdateCommentRequestDto } from './dto/request/update-comment-request.dto';

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
      .orderBy('comment.createdAt', 'ASC')
      .getMany();
  }

  async updateComment({ comment, id }: UpdateCommentRequestDto) {
    return await this.createQueryBuilder().update(Comment).set({ comment }).where('id =:id', { id: id }).execute();
  }

  async deleteComment(commentId: number) {
    return await this.createQueryBuilder().delete().where('comment.id = :commentId', { commentId }).execute();
  }
}
