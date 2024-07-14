import { Module } from '@nestjs/common';
import { SeeModule } from './see/see.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { PlaceModule } from './modules/place/place.module';
import { PlPickCategoryModule } from './modules/pl_pick_category/pl_pick_category.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, SeeModule, UserModule, PostModule, CommentModule, PlaceModule, PlPickCategoryModule],
})
export class AppModule {}
