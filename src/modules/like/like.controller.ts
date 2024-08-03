import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ToggleLikePostDecorator } from './docs/toggleLikePost.decorator';
import { GetLikesForPostDecorator } from './docs/getLikesForPost.decorator';
import { GetLikesForUserDecorator } from './docs/getLikesForUser.decorator';
import { User } from '../user/entities';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { Like } from './entities/like.entity';

@Controller('like')
@Serialize(Like)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @ToggleLikePostDecorator({
    summary: '토글 좋아요',
    description: '게시글에 대한 좋아요를 추가하거나, 이미 좋아요가 눌린 경우 좋아요를 취소',
  })
  async toggleLikePost(@Body() createLikeDto: CreateLikeDto, @Session() session: Record<string, User>) {
    return await this.likeService.toggleLikePost(createLikeDto, session.user);
  }

  @Get('post/:post_id')
  @GetLikesForPostDecorator({
    summary: '게시글 좋아요 개수 조회',
    description: '특정 게시글의 좋아요 개수 반환',
  })
  async getLikesForPost(@Param('post_id') post_id: number) {
    return this.likeService.getLikesForPost(post_id);
  }

  @Get('user/:user_id')
  @GetLikesForUserDecorator({
    summary: '사용자가 좋아요한 게시글 조회',
    description: '특정 사용자가 좋아요한 모든 게시글을 반환',
  })
  async getLikesForUser(@Param('user_id') user_id: string) {
    return this.likeService.getLikesForUser(user_id);
  }
}
