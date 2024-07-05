import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Res,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EntityManager } from 'typeorm';
import { SessionAuthGuard } from '../../common/guards/session-auth.guard';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { CreatePostDto, CreatePostLikeDto } from './dtos';
import { Post as PostEntity } from './entities';
import { PostService } from './post.service';
import { TransactionInterceptor } from '../../common/interceptors/transaction.interceptor';
import { TransactionManager } from '../../common/decorators/transaction-manager.decorator';

@ApiTags('post')
@Controller('post')
@Serialize(PostEntity)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(SessionAuthGuard)
  @ApiBody({ type: CreatePostDto })
  async postCreatePost(@Body() body: CreatePostDto, @Session() session: Record<string, any>): Promise<void> {
    await this.postService.createPost(body, session.user.id);
  }

  @Post('/like')
  @HttpCode(201)
  @UseGuards(SessionAuthGuard)
  @ApiBody({ type: CreatePostLikeDto })
  async postCreatePostLike(@Body() body: CreatePostLikeDto, @Session() session: Record<string, any>): Promise<void> {
    await this.postService.createPostLike(body.id, session.user.id);
  }
}
