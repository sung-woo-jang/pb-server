import { Module } from '@nestjs/common';
import { SeedModule } from './seed/seed.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { PlaceModule } from './modules/place/place.module';
import { PlPickCategoryModule } from './modules/pl_pick_category/pl_pick_category.module';
import { SearchModule } from './modules/search/search.module';
import { PlacePickModule } from './modules/place_pick/place_pick.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { FollowModule } from './modules/follow/follow.module';
import { KeywordModule } from './modules/keyword/keyword.module';
import { LikeModule } from './modules/like/like.module';
import { BatchModule } from './modules/batch/batch.module';
import { NewsfeedModule } from './modules/newsfeed/newsfeed.module';
import { CommonModule } from '@common/common.module';
import { CodeModule } from './modules/code/code.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    SeedModule,
    CommentModule,
    FollowModule,
    KeywordModule,
    LikeModule,
    NewsfeedModule,
    PlPickCategoryModule,
    PlaceModule,
    PlacePickModule,
    PostModule,
    SearchModule,
    TimelineModule,
    UserModule,
    BatchModule,
    CommonModule,
    CodeModule,
  ],
})
export class AppModule {}
