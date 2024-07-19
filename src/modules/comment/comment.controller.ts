import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentDocs } from './comment.docs';
import { CreateCommentDto } from './dto/request/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation(CommentDocs.createCommentOperation())
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    await this.commentService.createComment(createCommentDto);
  }
}
