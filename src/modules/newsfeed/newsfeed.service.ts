import { Injectable } from '@nestjs/common';
import { PostRepository } from '../post/repository/post.repository';
import { User } from '../user/entities';
import { FollowRepository } from '../follow/follow.repository';
import { Follow } from '../follow/entities/follow.entity';

@Injectable()
export class NewsfeedService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly followRepository: FollowRepository
  ) {}
  async getNewsFeeds(user: User) {
    const followers: Follow[] = await this.followRepository.getFollowersList(user.id);
    const followerAccounts = followers.map(({ follower_account }) => follower_account);
    return await this.postRepository.getNewsFeeds([...followerAccounts, user.id]);
  }
}
