import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';

export class CommentDocs {
  static createCommentOperation(): ApiOperationOptions {
    return { summary: 'Create a new comment' };
  }
}
