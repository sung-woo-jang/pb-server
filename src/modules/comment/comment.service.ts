import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CommentBuilder } from '../../builder';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private CommentRepository: Repository<Comment>) {}

  async createComment() {}
}
