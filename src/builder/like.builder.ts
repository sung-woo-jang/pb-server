import { BuilderCommon } from './builder';
import { Like } from '../modules/like/entities/like.entity';

export class LikeBuilder extends BuilderCommon<Like> {
  constructor() {
    super(Like);
  }

  setUserId(userId: string): LikeBuilder {
    this.object.user_id = userId;
    return this;
  }

  setPostId(postId: number): LikeBuilder {
    this.object.post_id = postId;
    return this;
  }
}
