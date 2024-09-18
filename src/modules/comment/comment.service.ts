import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { PostRepository } from '../post/repository/post.repository';
import { CommentRepository } from './comment.repository';
import { User } from '../user/entities';
import { UpdateCommentRequestDto } from './dto/request/update-comment-request.dto';

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

  async updateComment(updateCommentRequestDto: UpdateCommentRequestDto) {
    if (!(await this.commentRepository.updateComment(updateCommentRequestDto)))
      throw new NotFoundException('댓글을 찾을 수 없습니다.');

    return {
      message: '댓글이 성공적으로 수정되었습니다.',
    };
  }

  async deleteComment(commentId: number) {
    const result = await this.commentRepository.deleteComment(commentId);

    if (result.affected === 0) throw new NotFoundException(`알 수 없는 오류.`);

    return {
      message: '댓글이 성공적으로 삭제되었습니다.',
    };
  }
}
