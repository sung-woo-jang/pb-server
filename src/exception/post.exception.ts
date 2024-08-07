import { HttpException, NotFoundException } from '@nestjs/common';

export class PostException {
  static notFound(): HttpException {
    return new NotFoundException('게시글을 찾을 수 없습니다.');
  }

  static postAndUserNotFound(): HttpException {
    return new NotFoundException('사용자나 게시글을 찾을 수 없습니다.');
  }
}
