import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { UpdateCommentRequestDto } from '../dto/request/update-comment-request.dto';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { swaggerBaseApplyDecorator } from '@common/decorators/swaggerBaseApply.decorator';
import { SuccessBaseResponseSchema } from '@common/dto/response/success-base-response.dto';
import { ErrorBaseResponseSchema } from '@common/dto/response/error-response.dto';

const apiOkResponseSchema: ApiResponseOptions = {
  status: 200,
  schema: {
    allOf: [
      { $ref: getSchemaPath(SuccessBaseResponseSchema) },
      {
        properties: {
          data: { type: 'object', example: { message: '댓글이 성공적으로 수정되었습니다.' } },
        },
      },
    ],
  },
};

const errorResponseSchema: ApiResponseOptions = {
  status: 404,
  description: '댓글을 찾을 수 없음',
  schema: {
    $ref: getSchemaPath(ErrorBaseResponseSchema),
  },
};

export const UpdateCommentSwaggerDecorator = (apiOperation: ApiOperationOptions) => {
  return swaggerBaseApplyDecorator(
    ApiOperation(apiOperation),
    ApiBody({ type: UpdateCommentRequestDto }),
    ApiOkResponse(apiOkResponseSchema),
    ApiBadRequestResponse(errorResponseSchema)
  );
};
