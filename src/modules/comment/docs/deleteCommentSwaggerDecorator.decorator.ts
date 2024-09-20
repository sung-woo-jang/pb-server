import { ApiOperation, ApiParam, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { swaggerBaseApplyDecorator } from '@common/decorators/swaggerBaseApply.decorator';
import { ErrorBaseResponseSchema } from '@common/dto/response/error-response.dto';

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

const errorResponseOptions: ApiResponseOptions = {
  status: 404,
  description: '알 수 없는 오류',
  schema: {
    allOf: [
      {
        $ref: getSchemaPath(ErrorBaseResponseSchema),
      },
      {
        properties: {
          error: {
            properties: {
              message: { type: 'string', example: '알 수 없는 오류.' },
            },
          },
        },
      },
    ],
  },
};

export const DeleteCommentSwaggerDecorator = (apiOperation: ApiOperationOptions) => {
  return swaggerBaseApplyDecorator(
    ApiOperation(apiOperation),
    ApiParam({
      name: 'commentId',
      required: true,
      description: '삭제할 댓글의 ID',
      type: 'number',
    }),
    ApiResponse(successResponseOptions),
    ApiResponse(errorResponseOptions)
  );
};
