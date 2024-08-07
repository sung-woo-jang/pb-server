import { Controller, Get } from '@nestjs/common';
import { NewsfeedService } from './newsfeed.service';
import { NewsfeedDto } from './dto/response/newsfeed.dto';

@Controller('newsfeed')
export class NewsfeedController {
  constructor(private readonly newsfeedService: NewsfeedService) {}

  @Get('')
  async getNewsFeeds(): Promise<NewsfeedDto[]> {
    return await this.newsfeedService.getNewsFeeds();
  }
}
