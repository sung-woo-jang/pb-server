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
  ],
})
export class AppModule {}
