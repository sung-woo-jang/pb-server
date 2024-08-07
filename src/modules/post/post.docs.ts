import { ApiBodyOptions } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { CreatePostDto } from './dtos';

export class PostDocs {
  static createPostBody(): ApiBodyOptions {
    return { type: CreatePostDto };
  }

  static patchPostBody(): ApiBodyOptions {
    return { type: CreatePostDto };
  }

  static deletePostBody(): ApiBodyOptions {
    return { type: CreatePostDto };
  }
}
