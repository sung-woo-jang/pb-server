import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { GetCommentsResponseDto } from '../dto/response/get-comments-response.dto';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { swaggerBaseApplyDecorator } from '@common/decorators/swaggerBaseApply.decorator';
import { SuccessBaseResponseSchema } from '@common/dto/response/success-base-response.dto';
import { ErrorBaseResponseSchema } from '@common/dto/response/error-response.dto';

const apiBadRequestResponse: ApiResponseOptions = {
  status: 400,
  description: '잘못된 요청',
  schema: {
    $ref: getSchemaPath(ErrorBaseResponseSchema),
  },
};

const apiSuccessResponse: ApiResponseOptions = {
  status: 200,
  description: '댓글 불러오기 성공',
  schema: {
    allOf: [
      { $ref: getSchemaPath(SuccessBaseResponseSchema) },
      {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(GetCommentsResponseDto) },
          },
        },
      },
    ],
  },
};

export const GetCommentsSwaggerDecorator = (apiOperation: ApiOperationOptions) => {
  return swaggerBaseApplyDecorator(
    ApiOperation(apiOperation),
    ApiParam({
      name: 'postId',
      required: true,
      description: '댓글을 조회할 게시글의 ID',
      type: 'number',
    }),
    ApiExtraModels(GetCommentsResponseDto),
    ApiConsumes('application/json'),
    ApiResponse(apiSuccessResponse),
    ApiBadRequestResponse(apiBadRequestResponse)
  );
};
