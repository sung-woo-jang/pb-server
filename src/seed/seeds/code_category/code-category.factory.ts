import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { UseYn } from '@common/enums';
import { CodeCategoryBuilder } from '../../../builder/code-category.builder';
import { CodeCategory } from '../../../modules/code/entities/code-category.entity';

const CodeCategoryFactory = localeKoSetSeederFactory(CodeCategory, () => {
  return new CodeCategoryBuilder().setCtcCd('KEYWORD').setCtcName('키워드').setSortOrder(1).setUseYn(UseYn.YES).build();
});

export default CodeCategoryFactory;
