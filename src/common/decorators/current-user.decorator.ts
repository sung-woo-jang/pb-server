import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from '../../modules/user/entities';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();
  const session = request.session;

  if (!session || !session.user) throw new UnauthorizedException('로그인된 사용자 정보가 없습니다.');

  return session.user;
});
