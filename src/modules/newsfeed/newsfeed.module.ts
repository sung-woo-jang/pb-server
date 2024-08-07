import { Module } from '@nestjs/common';
import { NewsfeedService } from './newsfeed.service';
import { NewsfeedController } from './newsfeed.controller';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  controllers: [NewsfeedController],
  providers: [NewsfeedService],
})
export class NewsfeedModule {}
