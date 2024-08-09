import { Controller, Get, Param } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('timeline(타임라인)')
@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get('/:userId')
  getTimelineList(@Param('userId') userId: string) {
    return this.timelineService.getTimelineList(userId);
  }
}
