import { BuilderCommon } from './builder';
import { Comment } from '../modules/comment/entities/comment.entity';
import { User } from '../modules/user/entities';
import { Post } from '../modules/post/entities';

export class CommentBuilder extends BuilderCommon<Comment> {
  constructor() {
    super(Comment);
  }

  setComment(comment: string): CommentBuilder {
    this.object.comment = comment;
    return this;
  }

  setPost(post: Post): CommentBuilder {
    this.object.post = post;
    return this;
  }

  setAuthor(author: User): CommentBuilder {
    this.object.user = author;
    return this;
  }
}
