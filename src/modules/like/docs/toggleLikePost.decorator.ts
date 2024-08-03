import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiBodyOptions } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { CreateLikeDto } from '../dto/create-like.dto';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

const apiBody: ApiBodyOptions = {
  type: CreateLikeDto,
};

const apiCreatedResponse: ApiResponseOptions = {
  status: 201,
  description: '좋아요를 추가하거나 취소 성공',
  // TODO: Response DTO로 변경
  type: CreateLikeDto,
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

export const ToggleLikePostDecorator = (apiOperation: ApiOperationOptions) => {
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
