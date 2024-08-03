import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

const apiResponse: ApiResponseOptions = {
  status: 200,
  description: '특정 게시글의 좋아요 개수 조회 성공',
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

export const GetLikesForPostDecorator = (apiOperation: ApiOperationOptions) => {
  return applyDecorators(
    ApiOperation(apiOperation),
    ApiConsumes('application/json'),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse(apiResponse),
    ApiUnauthorizedResponse(apiUnauthorizedResponse),
    ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  );
};
