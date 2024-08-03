import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserModule } from '../user/user.module';
import { KeywordService } from '../keyword/keyword.service';
import { PostRepository } from './post.repository';
import { PlaceService } from '../place/place.service';
import { PlaceRepository } from '../place/place.repository';
import { KeywordRepository } from '../keyword/keyword.repository';

@Module({
  imports: [UserModule],
  controllers: [PostController],
  providers: [PostService, PlaceService, KeywordService, PostRepository, PlaceRepository, KeywordRepository],
})
export class PostModule {}
