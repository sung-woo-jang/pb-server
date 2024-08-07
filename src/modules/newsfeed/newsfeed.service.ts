import { Injectable } from '@nestjs/common';
import { NewsfeedDto } from './dto/response/newsfeed.dto';
import { PostRepository } from '../post/repository/post.repository';

@Injectable()
export class NewsfeedService {
  constructor(private readonly postRepository: PostRepository) {}
  async getNewsFeeds(): Promise<NewsfeedDto[]> {
    return await this.postRepository.getNewsFeeds();
  }
}
