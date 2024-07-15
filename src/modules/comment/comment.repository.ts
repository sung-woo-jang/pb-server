import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  async createComment() {
    return await this.create({});
  }
}
