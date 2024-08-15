import { Module } from '@nestjs/common';
import { NewsfeedService } from './newsfeed.service';
import { NewsfeedController } from './newsfeed.controller';
import { PostModule } from '../post/post.module';
import { FollowModule } from '../follow/follow.module';

@Module({
  imports: [PostModule, FollowModule],
  controllers: [NewsfeedController],
  providers: [NewsfeedService],
})
export class NewsfeedModule {}
