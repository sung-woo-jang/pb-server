import { Controller, Get, Param, ParseIntPipe, Session } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { User } from '../user/entities';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  getTimelineList() {
    return this.timelineService.getTimelineList();
  }

  @Get(':postId')
  getTimeLineDetail(@Param('postId', ParseIntPipe) postId: number, @Session() session: Record<string, User>) {
    return this.timelineService.getTimeLineDetail(postId, session.user);
  }
}
