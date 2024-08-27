import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from '../post/repository/post.repository';
import { CommentRepository } from './comment.repository';
import { User } from '../user/entities';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository
  ) {}

  async createComment({ comment, post_id }: CreateCommentDto, user: User) {
    const post = await this.postRepository.findOne({ where: { id: post_id } });
    if (!post) throw new NotFoundException('게시물 없음');

    return await this.commentRepository.save({ comment, post, user });
  }

  async getComments(postId: number) {
    return await this.commentRepository.getComments(postId);
  }
}
