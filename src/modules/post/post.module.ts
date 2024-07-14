import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities';
import { Keyword } from '../keyword/entities';
import { User } from '../user/entities';
import { UserModule } from '../user/user.module';
import { ImageService } from '../image/image.service';
import { KeywordService } from '../keyword/keyword.service';
import { Comment } from '../comment/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Keyword, Comment]), UserModule],
  controllers: [PostController],
  providers: [PostService, ImageService, KeywordService],
})
export class PostModule {}
