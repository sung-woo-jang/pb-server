import { Injectable } from '@nestjs/common';
import { User } from '../user/entities';

@Injectable()
export class TimelineService {
  getTimelineList() {}
  getTimeLineDetail(postId: number, user: User) {}
}
