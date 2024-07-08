import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthException {
  static stateNotFound(): HttpException {
    return new BadRequestException('state가 존재하지 않습니다.');
  }

  static stateNotExist(): HttpException {
    return new ForbiddenException('state가 일치하지 않습니다.');
  }

  static naverLoginError(): HttpException {
    return new InternalServerErrorException('로그인중 서버에서 에러가 발생하였습니다.');
  }
}
