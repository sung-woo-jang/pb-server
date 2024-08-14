import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCommentSwaggerDecorator } from './docs/createComment.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { GetCommentsResponseDto } from './dto/response/get-comments-response.dto';

@ApiTags('comment(댓글)')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @CreateCommentSwaggerDecorator()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    await this.commentService.createComment(createCommentDto);
  }

  @Get(':postId')
  @Serialize(GetCommentsResponseDto)
  async getComments(@Param('postId', ParseIntPipe) postId: number) {
    return await this.commentService.getComments(postId);
  }
}
