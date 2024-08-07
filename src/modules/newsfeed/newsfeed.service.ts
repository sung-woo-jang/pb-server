import { Injectable } from '@nestjs/common';
import { PostRepository } from '../post/repository/post.repository';

@Injectable()
export class NewsfeedService {
  constructor(private readonly postRepository: PostRepository) {}
  async getNewsFeeds() {
    return await this.postRepository.getNewsFeeds();
  }
}
