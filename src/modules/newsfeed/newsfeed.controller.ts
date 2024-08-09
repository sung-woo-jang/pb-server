import { Controller, Get } from '@nestjs/common';
import { NewsfeedService } from './newsfeed.service';
import { NewsfeedDto } from './dto/response/newsfeed.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { Post as PostEntity } from '../post/entities';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('newsfeed(뉴스피드)')
@Controller('newsfeed')
@Serialize(PostEntity)
export class NewsfeedController {
  constructor(private readonly newsfeedService: NewsfeedService) {}

  @Get()
  async getNewsFeeds(): Promise<NewsfeedDto[]> {
    return await this.newsfeedService.getNewsFeeds();
  }
}
