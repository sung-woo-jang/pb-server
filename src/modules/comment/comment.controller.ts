import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { CreateCommentSwaggerDecorator } from './docs/createComment.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { GetCommentsResponseDto } from './dto/response/get-comments-response.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '../user/entities';
import { UpdateCommentRequestDto } from './dto/request/update-comment-request.dto';
import { GetCommentsSwaggerDecorator } from './docs/getComments.decorator';
import { DeleteCommentSwaggerDecorator } from './docs/deleteCommentSwaggerDecorator.decorator';

@ApiTags('comment(댓글)')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @CreateCommentSwaggerDecorator({
    summary: '댓글 생성',
    description: '댓글을 생성합니다.',
  })
  async createComment(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: User) {
    await this.commentService.createComment(createCommentDto, user);
  }

  @Patch()
  @Serialize()
  async updateComment(@Body() updateCommentRequestDto: UpdateCommentRequestDto) {
    return await this.commentService.updateComment(updateCommentRequestDto);
  }

  @Delete('/:commentId')
  @Serialize()
  @DeleteCommentSwaggerDecorator({ summary: '댓글 삭제', description: '특정 댓글을 삭제합니다.' })
  deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentService.deleteComment(commentId);
  }

  @Get(':postId')
  @Serialize(GetCommentsResponseDto)
  @GetCommentsSwaggerDecorator({
    summary: '댓글 목록 가져오기',
    description: '게시물 ID를 사용하여 게시물에 포함된 댓글 목록을 가져옴',
  })
  async getComments(@Param('postId', ParseIntPipe) postId: number) {
    return await this.commentService.getComments(postId);
  }
}
