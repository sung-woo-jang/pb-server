import { Body, Controller, Delete, HttpCode, Patch, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EntityManager } from 'typeorm';
import { SessionAuthGuard } from '@common/guards/session-auth.guard';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { CreatePostDto, DeletePostDto, PostLikeDto, UpdatePostDto } from './dtos';
import { Post as PostEntity } from './entities';
import { PostService } from './post.service';
import { TransactionInterceptor } from '@common/interceptors/transaction.interceptor';
import { TransactionManager } from '@common/decorators/transaction-manager.decorator';

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

  @Patch()
  @HttpCode(201)
  @UseGuards(SessionAuthGuard)
  @UseInterceptors(TransactionInterceptor)
  @ApiBody({ type: CreatePostDto })
  async patchUpdatePost(
    @Body() body: UpdatePostDto,
    @TransactionManager() transactionManager: EntityManager
  ): Promise<void> {
    await this.postService.updatePost(body, transactionManager);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(SessionAuthGuard)
  @ApiBody({ type: CreatePostDto })
  async deletePost(@Body() body: DeletePostDto): Promise<void> {
    await this.postService.deletePost(body.id);
  }

  @Post('/like')
  @HttpCode(201)
  @UseGuards(SessionAuthGuard)
  @ApiBody({ type: PostLikeDto })
  async postCreatePostLike(@Body() body: PostLikeDto, @Session() session: Record<string, any>): Promise<void> {
    await this.postService.createPostLike(body.id, session.user.id);
  }

  @Delete('/like')
  @HttpCode(201)
  @UseGuards(SessionAuthGuard)
  @ApiBody({ type: PostLikeDto })
  async deletePostLike(@Body() body: PostLikeDto, @Session() session: Record<string, any>): Promise<void> {
    await this.postService.deletePostLike(body.id, session.user.id);
  }
}
