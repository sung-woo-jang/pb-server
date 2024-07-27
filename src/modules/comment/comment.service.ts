import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';
import { CommentBuilder } from '../../builder';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository
  ) {}

  async createComment({ comment, post_id, author_account }: CreateCommentDto) {
    const post = await this.postRepository.findOne({ where: { id: post_id } });
    if (!post) throw new NotFoundException('게시물 없음');

    const user = await this.userRepository.findOne({ where: { id: author_account } });
    if (!user) throw new NotFoundException('사용자 없음');

    const newComment = new CommentBuilder().setComment(comment).setPost(post).setAuthor(user).build();

    return await this.commentRepository.save(newComment);
  }
}
