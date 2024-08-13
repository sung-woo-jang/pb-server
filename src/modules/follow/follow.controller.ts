import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { User } from '../user/entities';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { FollowListResponseDto } from './dto/response/folloe-list-response.dto';

@ApiTags('follow(팔로우)')
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  following(@Body() createFollowDto: CreateFollowDto, @Session() session: Record<string, User>) {
    return this.followService.following(createFollowDto, session.user);
  }

  @ApiProperty({ description: '팔로우/팔로잉 정보' })
  @Get()
  @Serialize(FollowListResponseDto)
  async getFollowList(@Session() session: Record<string, User>) {
    // TODO: User 정보 없으면 에러 던지기
    return await this.followService.getFollowList(session.user);
  }
  @ApiProperty({ description: '팔로우/팔로잉 숫자만' })
  @Get('count')
  async getFollowCount(@Session() session: Record<string, User>) {
    // TODO: User 정보 없으면 에러 던지기
    return await this.followService.getFollowCount(session.user);
  }
}
