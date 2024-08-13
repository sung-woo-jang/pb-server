import { Controller, Get, Param } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { ApiTags } from '@nestjs/swagger';
import { TimelineListResponseDto } from './dto/response/timeline-list-response.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';

@ApiTags('timeline(타임라인)')
@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get('/:userId')
  @Serialize(TimelineListResponseDto)
  getTimelineList(@Param('userId') userId: string) {
    return this.timelineService.getTimelineList(userId);
  }
}
