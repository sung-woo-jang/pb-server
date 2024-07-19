import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from './entities';
import { NewsfeedDto } from './dtos/response/newsfeed.dto';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }
  async getNewsFeeds(): Promise<NewsfeedDto[]> {
    return await this.find({
      relations: {
        place: true,
        keywords: true,
        user: true,
        likedByUsers: true,
        comments: true,
        image: true,
      },
    });
  }
}
