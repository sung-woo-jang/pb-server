import { Module } from '@nestjs/common';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TimelineController],
  providers: [TimelineService],
})
export class TimelineModule {}
