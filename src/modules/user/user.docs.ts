import { ApiQueryOptions, ApiResponseOptions } from '@nestjs/swagger';
import { UserDto } from './dtos';
import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';

export class UserDocs {
  static codeQuery(): ApiQueryOptions {
    return {
      name: 'code',
      required: true,
      type: String,
      description: 'Filter users by code',
    };
  }

  static stateQuery(): ApiQueryOptions {
    return {
      name: 'state',
      required: true,
      type: String,
      description: 'Filter users by name',
    };
  }

  static createUserResponse(): ApiResponseOptions {
    return {
      status: 201,
      description: 'User created successfully.',
      type: UserDto,
    };
  }

  static createCommentOperation(): ApiOperationOptions {
    return { summary: 'Get users with optional query parameters' };
  }
}
