import { ApiExtraModels, ApiInternalServerErrorResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorBaseResponseSchema, UnAuthorizedResponseDto } from '@common/dto/response/error-response.dto';
import { SuccessBaseResponseSchema } from '@common/dto/response/success-base-response.dto';
import { applyDecorators } from '@nestjs/common';

export const swaggerBaseApplyDecorator = (...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>) =>
  applyDecorators(
    ApiExtraModels(SuccessBaseResponseSchema, ErrorBaseResponseSchema),
    ApiInternalServerErrorResponse({
      status: 500,
      description: '서버 오류',
    }),
    ApiUnauthorizedResponse({
      status: 401,
      type: UnAuthorizedResponseDto,
      content: {
        'application/json': {
          example: {
            status: 401,
            message: 'Unauthorized',
            isLogin: false,
            error: {
              message: '로그인된 사용자 정보가 없습니다.',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
    }),
    ...decorators
  );
