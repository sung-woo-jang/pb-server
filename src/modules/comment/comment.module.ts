import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CommentController],
  providers: [CommentService, PostRepository, CommentRepository, UserRepository],
})
export class CommentModule {}
