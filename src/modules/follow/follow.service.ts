import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { User } from '../user/entities';
import * as _ from 'lodash';
import { FollowRepository } from './follow.repository';

@Injectable()
export class FollowService {
  constructor(private followRepository: FollowRepository) {}
  async following({ following_account }: CreateFollowDto, { id: follower_account }: User) {
    // 자기 자신을 팔로우하려는 경우를 방지
    if (following_account === follower_account) throw new BadRequestException('자기 자신을 팔로우할 수 없습니다.');

    // 현재 팔로우 상태를 조회
    const existingFollow = await this.followRepository.findExistingFollow({ following_account, follower_account });

    if (_.isNil(existingFollow)) {
      // 팔로우 상태가 존재하지 않으면 팔로우 (추가)
      await this.followRepository.addFollow({ follower_account, following_account });
      return { message: '팔로우 되었습니다.' };
    }

    if (!_.isNil(existingFollow.deletedAt)) {
      // 이미 softDelete된 경우, 복구하여 팔로우 상태로 전환
      await this.followRepository.restoreFollow({ follower_account, following_account });
      return { message: '팔로우 되었습니다.' };
    }

    // 팔로우 상태가 이미 존재하면 softDelete로 언팔로우 처리
    await this.followRepository.softDeleteFollow({ follower_account, following_account });
    return { message: '언팔로우 되었습니다.' };
  }
}
