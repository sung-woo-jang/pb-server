import { Injectable } from '@nestjs/common';
import { CreateNewsfeedDto } from './dto/create-newsfeed.dto';
import { UpdateNewsfeedDto } from './dto/update-newsfeed.dto';
import { NewsfeedDto } from './dto/response/newsfeed.dto';
import { PostRepository } from '../post/post.repository';

@Injectable()
export class NewsfeedService {
  constructor(private readonly postRepository: PostRepository) {}
  async getNewsFeeds(): Promise<NewsfeedDto[]> {
    return await this.postRepository.getNewsFeeds();
  }
}
