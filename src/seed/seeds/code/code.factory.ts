import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { Code } from '../../../modules/code/entities/code.entity';
import { CodeBuilder } from '../../../builder/code.builder';
import { UseYn } from '@common/enums';

const codeValues = {
  AMBIENCE: ['로맨틱한', '조용한', '활기찬', '고급스러운', '편안한'],
  PRICE: ['저렴한', '적당한', '비싼', '가성비 좋은', '고급'],
  SERVICE: ['친절한', '빠른', '전문적인', '불친절한', '느린'],
  FOOD_QUALITY: ['맛있는', '신선한', '창의적인', '평범한', '맛없는'],
  CLEANLINESS: ['깨끗한', '정돈된', '지저분한', '청결한', '개선 필요한'],
};

const CodeFactory = localeKoSetSeederFactory(Code, (faker) => {
  const typeId = faker.helpers.arrayElement(Object.keys(codeValues));
  const label = faker.helpers.arrayElement(codeValues[typeId]) as string;
  return new CodeBuilder()
    .setCode(label.toUpperCase().replace(/\s+/g, '_'))
    .setLabel(label)
    .setSortOrder(faker.number.int({ min: 1, max: 5 }))
    .setUseYn(UseYn.YES)
    .build();
});

export default CodeFactory;
