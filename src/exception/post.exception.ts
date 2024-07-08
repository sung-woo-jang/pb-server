import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';

export class PostException {
  static notFound(): HttpException {
    return new NotFoundException('게시글을 찾을 수 없습니다.');
  }
}
