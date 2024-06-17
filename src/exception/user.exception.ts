import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';

export class UserException {
  static userNotFound(): HttpException {
    return new NotFoundException('사용자를 찾을 수 없습니다.');
  }

  static userUnauthorized(): HttpException {
    return new UnauthorizedException('해당 유저에 권한이 없습니다.');
  }
}
