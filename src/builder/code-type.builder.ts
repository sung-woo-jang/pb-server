import { BuilderCommon } from './builder';
import { CodeType } from '../modules/code/entities/code-type.entity';
import { UseYn } from '@common/enums';

export class CodeTypeBuilder extends BuilderCommon<CodeType> {
  constructor() {
    super(CodeType);
  }

  setTypeId(typeId: string): CodeTypeBuilder {
    this.object.typeId = typeId;
    return this;
  }

  setTypeName(typeName: string): CodeTypeBuilder {
    this.object.typeName = typeName;
    return this;
  }

  setSortOrder(sortOrder: number): CodeTypeBuilder {
    this.object.sortOrder = sortOrder;
    return this;
  }

  setUseYn(useYn: UseYn): CodeTypeBuilder {
    this.object.useYn = useYn;
    return this;
  }
}
