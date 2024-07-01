import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateNicknameDto extends PickType(User, ['nickname'] as const) {}
