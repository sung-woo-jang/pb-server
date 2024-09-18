import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const successResponseOptions: ApiResponseOptions = {
  status: 200,
  description: '댓글 삭제 성공',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: '댓글이 성공적으로 삭제되었습니다.',
      },
    },
  },
};

const errorResponseSchema: SchemaObject & Partial<ReferenceObject> = {
  type: 'object',
  properties: {
    status: { type: 'number', example: 404 },
    message: { type: 'string', example: 'Not Found' },
    isLogin: { type: 'boolean', example: true },
    error: {
      type: 'object',
      properties: {
        message: { type: 'string', example: '알 수 없는 오류.' },
        error: { type: 'string', example: 'Not Found' },
        statusCode: { type: 'number', example: 404 },
      },
    },
  },
};
const errorResponseOptions: ApiResponseOptions = {
  status: 404,
  description: '알 수 없는 오류',
  schema: errorResponseSchema,
};

export const DeleteCommentSwaggerDecorator = (apiOperation: ApiOperationOptions) => {
  return applyDecorators(
    ApiOperation(apiOperation),
    ApiParam({
      name: 'commentId',
      required: true,
      description: '삭제할 댓글의 ID',
      type: 'number',
    }),
    ApiResponse(successResponseOptions),
    ApiResponse(errorResponseOptions),
    ApiUnauthorizedResponse({ description: '인증 실패' })
  );
};
