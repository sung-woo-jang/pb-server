import { Module } from '@nestjs/common';
import { SeedModule } from './seed/seed.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { PlaceModule } from './modules/place/place.module';
import { PlPickCategoryModule } from './modules/pl_pick_category/pl_pick_category.module';
import { SearchHistoryModule } from './modules/search_history/search_history.module';
import { PlacePickModule } from './modules/place_pick/place_pick.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { FollowModule } from './modules/follow/follow.module';
import { KeywordModule } from './modules/keyword/keyword.module';
import { LikeModule } from './modules/like/like.module';
import { BatchModule } from './modules/batch/batch.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    SeedModule,
    UserModule,
    PostModule,
    CommentModule,
    PlaceModule,
    PlPickCategoryModule,
    SearchHistoryModule,
    PlacePickModule,
    TimelineModule,
    FollowModule,
    KeywordModule,
    LikeModule,
    BatchModule,
  ],
})
export class AppModule {}
