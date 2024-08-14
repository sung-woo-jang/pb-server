import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Patch,
  Post,
  Session,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EntityManager } from 'typeorm';
import { SessionAuthGuard } from '@common/guards/session-auth.guard';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { CreatePostDto, DeletePostDto, UpdatePostDto } from './dtos';
import { Post as PostEntity } from './entities';
import { PostService } from './post.service';
import { TransactionInterceptor } from '@common/interceptors/transaction.interceptor';
import { TransactionManager } from '@common/decorators/transaction-manager.decorator';
import { PostDocs } from './post.docs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerDiskOptions } from '../../config/multer.option';
import { ImageSharpPipe } from './pipe/imageSharp.pipe';
import { UploadedFilesDto } from './dtos/uploaded-files.dto';

@ApiTags('post(게시글)')
@Controller('post')
@Serialize(PostEntity)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(SessionAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'placeImages', maxCount: 10 }], multerDiskOptions))
  @ApiBody(PostDocs.createPostBody())
  async createPost(
    @UploadedFiles(ImageSharpPipe)
    imageList: UploadedFilesDto,
    @Body()
    body: CreatePostDto,
    @Session() session: Record<string, any>
  ) {
    return await this.postService.createPost(imageList, body, session.user.id);
  }

  @Patch()
  @HttpCode(201)
  @UseGuards(SessionAuthGuard)
  @UseInterceptors(TransactionInterceptor)
  @ApiBody(PostDocs.patchPostBody())
  async updatePost(
    @Body() body: UpdatePostDto,
    @TransactionManager() transactionManager: EntityManager
  ): Promise<void> {
    await this.postService.updatePost(body, transactionManager);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(SessionAuthGuard)
  @ApiBody(PostDocs.deletePostBody())
  async deletePost(@Body() body: DeletePostDto): Promise<void> {
    await this.postService.deletePost(body.id);
  }
}
