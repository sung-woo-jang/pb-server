import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { CodeType } from '../../../modules/code/entities/code-type.entity';
import { CodeTypeBuilder } from '../../../builder/code-type.builder';
import { UseYn } from '@common/enums';

const codeTypes = [
  { typeId: 'AMBIENCE', typeName: '분위기' },
  { typeId: 'PRICE', typeName: '가격' },
  { typeId: 'SERVICE', typeName: '서비스' },
  { typeId: 'FOOD_QUALITY', typeName: '음식 품질' },
  { typeId: 'CLEANLINESS', typeName: '청결도' },
];

const CodeTypeFactory = localeKoSetSeederFactory(CodeType, (faker) => {
  const { typeId, typeName } = faker.helpers.arrayElement(codeTypes);
  return new CodeTypeBuilder()
    .setTypeId(typeId)
    .setTypeName(typeName)
    .setSortOrder(faker.number.int({ min: 1, max: 5 }))
    .setUseYn(UseYn.YES)
    .build();
});

export default CodeTypeFactory;
