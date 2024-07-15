import { ApiBodyOptions } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { CreatePostDto, PostLikeDto } from './dtos';
import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';

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

  static createPostLikeBody(): ApiBodyOptions {
    return { type: PostLikeDto };
  }

  static deletePostLikeBody(): ApiBodyOptions {
    return { type: PostLikeDto };
  }
}
