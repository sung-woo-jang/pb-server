import { BuilderCommon } from './builder';
import { Keyword } from '../modules/keyword/entities';

export class KeywordBuilder extends BuilderCommon<Keyword> {
  constructor() {
    super(Keyword);
  }

  setKeyword(path: string): KeywordBuilder {
    this.object.keyword = path;
    return this;
  }
}
