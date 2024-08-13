import { Body, Controller, Get, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { User } from '../user/entities';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { FollowListResponseDto } from './dto/response/follow-list-response.dto';
import { FollowCountResponseDto } from './dto/response/follow-count-response.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('follow(팔로우)')
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  following(@Body() createFollowDto: CreateFollowDto, @CurrentUser() user: User) {
    return this.followService.following(createFollowDto, user);
  }

  @ApiProperty({ description: '팔로우/팔로잉 정보' })
  @Get()
  @Serialize(FollowListResponseDto)
  async getFollowList(@CurrentUser() user: User) {
    return await this.followService.getFollowList(user);
  }
  @ApiProperty({ description: '팔로우/팔로잉 숫자만' })
  @Serialize(FollowCountResponseDto)
  @Get('count')
  async getFollowCount(@CurrentUser() user: User) {
    return await this.followService.getFollowCount(user);
  }
}
