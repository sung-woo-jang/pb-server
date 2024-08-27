import { PickType } from '@nestjs/swagger';
import { Follow } from '../../entities/follow.entity';

export class CreateFollowRequestDto extends PickType(Follow, ['following_account'] as const) {}
