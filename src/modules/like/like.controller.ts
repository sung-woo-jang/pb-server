import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ToggleLikePostDecorator } from './docs/toggleLikePost.decorator';
import { GetLikesForPostDecorator } from './docs/getLikesForPost.decorator';
import { GetLikesForUserDecorator } from './docs/getLikesForUser.decorator';
import { User } from '../user/entities';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { Like } from './entities/like.entity';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ToggleLikeResponseDto } from './dto/response/toggle-like-response.dto';
import { LikesCountResponseDto } from './dto/response/likes-count-response.dto';

@ApiTags('like(좋아요)')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @Serialize(ToggleLikeResponseDto)
  @ToggleLikePostDecorator({
    summary: '토글 좋아요',
    description: '게시글에 대한 좋아요를 추가하거나, 이미 좋아요가 눌린 경우 좋아요를 취소',
  })
  async toggleLikePost(@Body() createLikeDto: CreateLikeDto, @CurrentUser() user: User) {
    return await this.likeService.toggleLikePost(createLikeDto, user);
  }

  @Get('user/:user_id')
  @Serialize(Like)
  @GetLikesForUserDecorator({
    summary: '사용자가 좋아요한 게시글 조회',
    description: '특정 사용자가 좋아요한 모든 게시글을 반환',
  })
  async getLikesForUser(@Param('user_id') user_id: string) {
    return this.likeService.getLikesForUser(user_id);
  }

  @Get('post/:post_id')
  @Serialize(LikesCountResponseDto)
  @GetLikesForPostDecorator({
    summary: '게시글 좋아요 개수 조회',
    description: '특정 게시글의 좋아요 개수 반환',
  })
  async getLikesForPost(@Param('post_id') post_id: number) {
    return this.likeService.getLikesForPost(post_id);
  }
}
