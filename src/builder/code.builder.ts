import { BuilderCommon } from './builder';
import { Code } from '../modules/code/entities/code.entity';
import { UseYn } from '@common/enums';

export class CodeBuilder extends BuilderCommon<Code> {
  constructor() {
    super(Code);
  }

  setCode(code: string): CodeBuilder {
    this.object.code = code;
    return this;
  }

  setUpperCode(upperCode: string | null): CodeBuilder {
    this.object.upperCode = upperCode;
    return this;
  }

  setSortOrder(sortOrder: number): CodeBuilder {
    this.object.sortOrder = sortOrder;
    return this;
  }

  setLabel(label: string): CodeBuilder {
    this.object.label = label;
    return this;
  }

  setUseYn(useYn: UseYn): CodeBuilder {
    this.object.useYn = useYn;
    return this;
  }
}
