import { PickType } from '@nestjs/swagger';
import { User } from '../entities';

export class UpdateNicknameDto extends PickType(User, ['nickname'] as const) {}
