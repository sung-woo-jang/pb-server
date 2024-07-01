import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserDto extends PickType(User, [
  'id',
  'ageRange',
  'birthday',
  'birthyear',
  'gender',
  'email',
  'mobile',
  'name',
  'nickname',
  'profileImage',
] as const) {}
