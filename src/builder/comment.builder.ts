import { BuilderCommon } from './builder';
import { Comment } from '../modules/comment/entities/comment.entity';

export class CommentBuilder extends BuilderCommon<Comment> {
  constructor() {
    super(Comment);
  }

  setComment(comment: string): CommentBuilder {
    this.object.comment = comment;
    return this;
  }
}
