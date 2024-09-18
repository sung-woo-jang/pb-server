import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { UpdateCommentRequestDto } from '../dto/request/update-comment-request.dto';

const successResponseSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: '댓글이 성공적으로 수정되었습니다.',
    },
  },
};

const errorResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'number', example: 404 },
    message: { type: 'string', example: 'Not Found' },
    isLogin: { type: 'boolean', example: true },
    error: {
      type: 'object',
      properties: {
        message: { type: 'string', example: '댓글을 찾을 수 없습니다.' },
        error: { type: 'string', example: 'Not Found' },
        statusCode: { type: 'number', example: 404 },
      },
    },
  },
};

export const UpdateCommentSwaggerDecorator = (apiOperation: ApiOperationOptions) => {
  return applyDecorators(
    ApiOperation(apiOperation),
    ApiBody({ type: UpdateCommentRequestDto }),
    ApiResponse({
      status: 200,
      description: '댓글 수정 성공',
      schema: successResponseSchema,
    }),
    ApiUnauthorizedResponse({ description: '인증 실패' }),
    ApiResponse({
      status: 404,
      description: '댓글을 찾을 수 없음',
      schema: errorResponseSchema,
    })
  );
};
