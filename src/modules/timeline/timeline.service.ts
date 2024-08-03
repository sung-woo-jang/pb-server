import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class TimelineService {
  constructor(private readonly userRepository: UserRepository) {}
  async getTimelineList(userId: string) {
    return await this.userRepository.getTimelineList(userId);
  }
}
