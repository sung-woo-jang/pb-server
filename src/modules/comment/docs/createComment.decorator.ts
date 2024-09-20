import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ApiBodyOptions } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { CreateCommentDto } from '../dto/request/create-comment.dto';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { swaggerBaseApplyDecorator } from '@common/decorators/swaggerBaseApply.decorator';

const apiBody: ApiBodyOptions = {
  type: CreateCommentDto,
};

const apiCreatedResponse: ApiResponseOptions = {
  status: 201,
  description: '댓글 생성 성공',
  type: CreateCommentDto,
};

const apiBadRequestResponse: ApiResponseOptions = {
  status: 400,
  description: '잘못된 요청으로 게시글 생성 실패',
};

export const CreateCommentSwaggerDecorator = (apiOperation: ApiOperationOptions) => {
  return swaggerBaseApplyDecorator(
    ApiOperation(apiOperation),
    ApiBody(apiBody),
    ApiConsumes('application/json'),
    ApiCreatedResponse(apiCreatedResponse),
    ApiBadRequestResponse(apiBadRequestResponse)
  );
};
