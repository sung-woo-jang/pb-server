import { BuilderCommon } from './builder';
import { Post } from '../modules/post/entities';
import { User } from '../modules/user/entities';
import { Keyword } from '../modules/keyword/entities';

export class PostBuilder extends BuilderCommon<Post> {
  constructor() {
    super(Post);
  }

  setContent(content: string): PostBuilder {
    this.object.content = content;
    return this;
  }

  setVisitDate(visitDate: Date): PostBuilder {
    this.object.visitDate = visitDate;
    return this;
  }

  setRate(rate: number): PostBuilder {
    this.object.rate = rate;
    return this;
  }

  setAuthor(author: User): PostBuilder {
    this.object.user = author;
    return this;
  }

  setKeywords(keywords: Keyword[]): PostBuilder {
    this.object.keywords = keywords;
    return this;
  }
}
