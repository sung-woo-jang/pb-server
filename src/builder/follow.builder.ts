import { BuilderCommon } from './builder';
import { Follow, FollowStatus } from '../modules/follow/entities/follow.entity';

export class FollowBuilder extends BuilderCommon<Follow> {
  constructor() {
    super(Follow);
  }

  setFollowerAccount(follower_account: string): FollowBuilder {
    this.object.follower_account = follower_account;
    return this;
  }
  setFollowingAccount(following_account: string): FollowBuilder {
    this.object.following_account = following_account;
    return this;
  }

  setStatus(status: FollowStatus): FollowBuilder {
    this.object.status = status;
    return this;
  }
}
