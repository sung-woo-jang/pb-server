import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { CodeType } from '../../../modules/code/entities/code-type.entity';
import { CodeTypeBuilder } from '../../../builder/code-type.builder';
import { UseYn } from '@common/enums';

const codeTypes = [
  { typeName: '스타일', sortOrder: 1 },
  { typeName: '시설/서비스', sortOrder: 2 },
  { typeName: '가격/기타', sortOrder: 3 },
];

const CodeTypeFactory = localeKoSetSeederFactory(CodeType, (faker) => {
  const { typeName, sortOrder } = faker.helpers.arrayElement(codeTypes);
  return new CodeTypeBuilder().setTypeName(typeName).setSortOrder(sortOrder).setUseYn(UseYn.YES).build();
});

export default CodeTypeFactory;
