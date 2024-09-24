import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { CodeCategory } from '../../../modules/code/entities/code-category.entity';
import { CodeCategoryBuilder } from '../../../builder/code-category.builder';
import { UseYn } from '@common/enums';

const CodeCategoryFactory = localeKoSetSeederFactory(CodeCategory, (faker) =>
  new CodeCategoryBuilder().setCtcName('리뷰 키워드').setSortOrder(1).setUseYn(UseYn.YES).build()
);

export default CodeCategoryFactory;
