import { BuilderCommon } from './builder';
import { CodeCategory } from '../modules/code/entities/code-category.entity';
import { UseYn } from '@common/enums';

export class CodeCategoryBuilder extends BuilderCommon<CodeCategory> {
  constructor() {
    super(CodeCategory);
  }

  setCtcName(ctcName: string): CodeCategoryBuilder {
    this.object.ctcName = ctcName;
    return this;
  }

  setSortOrder(sortOrder: number): CodeCategoryBuilder {
    this.object.sortOrder = sortOrder;
    return this;
  }

  setUseYn(useYn: UseYn): CodeCategoryBuilder {
    this.object.useYn = useYn;
    return this;
  }
}
