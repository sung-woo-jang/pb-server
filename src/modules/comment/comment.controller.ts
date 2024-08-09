import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCommentSwaggerDecorator } from './docs/createComment.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comment(댓글)')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @CreateCommentSwaggerDecorator()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    await this.commentService.createComment(createCommentDto);
  }
}
