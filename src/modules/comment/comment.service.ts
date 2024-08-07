import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from '../post/repository/post.repository';
import { UserRepository } from '../user/user.repository';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) {}

  async createComment({ comment, post_id, author_account }: CreateCommentDto) {
    const post = await this.postRepository.findOne({ where: { id: post_id } });
    if (!post) throw new NotFoundException('게시물 없음');

    const user = await this.userRepository.findOne({ where: { id: author_account } });
    if (!user) throw new NotFoundException('사용자 없음');

    return await this.commentRepository.save({ comment, post, user });
  }
}
