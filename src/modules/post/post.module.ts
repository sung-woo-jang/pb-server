import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserModule } from '../user/user.module';
import { PostRepository } from './repository/post.repository';
import { KeywordModule } from '../keyword/keyword.module';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [UserModule, KeywordModule, PlaceModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostRepository],
})
export class PostModule {}
