import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiBodyOptions } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';

const apiOperation: ApiOperationOptions = {
  summary: '댓글 생성',
  description: '댓글을 생성합니다.',
};

const apiBody: ApiBodyOptions = {
  type: CreateCommentDto,
};

const apiCreatedResponse: ApiResponseOptions = {
  status: 201,
  description: '댓글 생성 성공',
  // TODO: Response DTO로 변경
  type: CreateCommentDto,
};

const apiUnauthorizedResponse: ApiResponseOptions = {
  status: 401,
  description: '권한이 없음',
};

const apiBadRequestResponse: ApiResponseOptions = {
  status: 400,
  description: '잘못된 요청으로 게시글 생성 실패',
};

const apiInternalServerErrorResponse: ApiResponseOptions = {
  status: 500,
  description: '서버 오류',
};

export const CreateCommentSwaggerDecorator = () => {
  return applyDecorators(
    ApiOperation(apiOperation),
    ApiBody(apiBody),
    ApiConsumes('application/json'),
    ApiCreatedResponse(apiCreatedResponse),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiUnauthorizedResponse(apiUnauthorizedResponse),
    ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  );
};
