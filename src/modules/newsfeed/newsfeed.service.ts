import { Injectable } from '@nestjs/common';
import { PostRepository } from '../post/repository/post.repository';
import { User } from '../user/entities';

@Injectable()
export class NewsfeedService {
  constructor(private readonly postRepository: PostRepository) {}
  async getNewsFeeds(user: User) {
    return await this.postRepository.getNewsFeeds(user);
  }
}
