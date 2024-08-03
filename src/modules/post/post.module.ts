import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserModule } from '../user/user.module';
import { PostRepository } from './post.repository';
import { KeywordModule } from '../keyword/keyword.module';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [UserModule, KeywordModule, PlaceModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
