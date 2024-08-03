import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCommentSwaggerDecorator } from './docs/createComment.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('댓글')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @CreateCommentSwaggerDecorator()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    await this.commentService.createComment(createCommentDto);
  }
}
