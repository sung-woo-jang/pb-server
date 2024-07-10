import { HttpException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class UserException {
  static notFound(): HttpException {
    return new NotFoundException('사용자를 찾을 수 없습니다.');
  }

  static unauthorized(): HttpException {
    return new UnauthorizedException('해당 유저에 권한이 없습니다.');
  }
}
