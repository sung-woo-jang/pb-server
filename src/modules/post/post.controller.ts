import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EntityManager } from 'typeorm';
import { CreatePostDto, DeletePostDto, UpdatePostDto } from './dtos';
import { PostService } from './post.service';
import { TransactionInterceptor } from '@common/interceptors/transaction.interceptor';
import { TransactionManager } from '@common/decorators/transaction-manager.decorator';
import { PostDocs } from './post.docs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerDiskOptions } from '../../config/multer.option';
import { ImageSharpPipe } from './pipe/imageSharp.pipe';
import { UploadedFilesDto } from './dtos/uploaded-files.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { NewsfeedResponseDto } from '../newsfeed/dto/response/newsfeed-response.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '../user/entities';
import { CreatePostResponseDto } from './dtos/response/create-post-response.dto';

@ApiTags('post(게시글)')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'placeImages', maxCount: 10 }], multerDiskOptions))
  @Serialize(CreatePostResponseDto)
  @ApiBody(PostDocs.createPostBody())
  async createPost(
    @UploadedFiles(ImageSharpPipe)
    imageList: UploadedFilesDto,
    @Body()
    body: CreatePostDto,
    @CurrentUser() user: User
  ) {
    return await this.postService.createPost(imageList, body, user);
  }

  @Get('/:postId')
  @Serialize(NewsfeedResponseDto)
  async getPostDetail(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postService.getPostDetail(postId);
  }

  @Patch()
  @HttpCode(201)
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
  @ApiBody(PostDocs.deletePostBody())
  async deletePost(@Body() body: DeletePostDto): Promise<void> {
    await this.postService.deletePost(body.id);
  }
}
