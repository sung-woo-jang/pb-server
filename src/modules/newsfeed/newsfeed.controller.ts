import { Controller, Get } from '@nestjs/common';
import { NewsfeedService } from './newsfeed.service';
import { NewsfeedResponseDto } from './dto/response/newsfeed-response.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '../user/entities';

@ApiTags('newsfeed(뉴스피드)')
@Controller('newsfeed')
export class NewsfeedController {
  constructor(private readonly newsfeedService: NewsfeedService) {}

  @Get()
  @Serialize(NewsfeedResponseDto)
  async getNewsFeeds(@CurrentUser() user: User): Promise<NewsfeedResponseDto[]> {
    return await this.newsfeedService.getNewsFeeds(user);
  }
}
