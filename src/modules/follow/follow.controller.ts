import { Body, Controller, Post, Session } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { User } from '../user/entities';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  following(@Body() createFollowDto: CreateFollowDto, @Session() session: Record<string, User>) {
    return this.followService.following(createFollowDto, session.user);
  }
}
