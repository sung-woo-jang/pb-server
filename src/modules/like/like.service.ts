import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeRepository } from './like.repository';
import * as _ from 'lodash';
import { User } from '../user/entities';
import { PostRepository } from '../post/repository/post.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postRepository: PostRepository
  ) {}
  async toggleLikePost({ post_id }: CreateLikeDto, { id: user_id }: User) {
    if (_.isNil(await this.postRepository.findOne({ where: { id: post_id } })))
      throw new NotFoundException('해당 게시물을 찾을 수 없습니다.');

    // 기존에 좋아요가 눌렸는지 확인

    if (!_.isNil(await this.likeRepository.findExistingLike(user_id, post_id))) {
      // 좋아요가 이미 눌린 상태라면, 좋아요 취소 (삭제)
      await this.likeRepository.removeLike({ user_id, post_id });
      return { message: '좋아요 취소.' };
    } else {
      // 좋아요가 눌리지 않은 상태라면, 좋아요 추가
      await this.likeRepository.addLike({ user_id, post_id });
      return { message: '좋아요 성공.' };
    }
  }

  async getLikesForPost(post_id: number) {
    return await this.likeRepository.count({ where: { post_id } });
  }

  async getLikesForUser(user_id: string) {
    return await this.likeRepository.find({ where: { user_id } });
  }
}
