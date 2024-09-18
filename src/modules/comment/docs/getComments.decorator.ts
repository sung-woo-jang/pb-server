import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetCommentsResponseDto } from '../dto/response/get-comments-response.dto';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';

const apiResponse: ApiResponseOptions = {
  status: 200,
  description: '댓글 불러오기 성공',
  type: () => GetCommentsResponseDto,
  isArray: true,
};

export const GetCommentsSwaggerDecorator = (apiOperation: ApiOperationOptions) => {
  return applyDecorators(
    ApiOperation(apiOperation),
    ApiParam({
      name: 'postId',
      required: true,
      description: '댓글을 조회할 게시글의 ID',
      type: 'number',
    }),
    ApiConsumes('application/json'),
    ApiResponse(apiResponse),
    // TODO: 만들고 채우기
    ApiBadRequestResponse(),
    ApiUnauthorizedResponse(),
    ApiInternalServerErrorResponse()
  );
};
