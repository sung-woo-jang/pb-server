import { Module } from '@nestjs/common';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [TimelineController],
  providers: [TimelineService, UserRepository],
})
export class TimelineModule {}
