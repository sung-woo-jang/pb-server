import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { Code } from '../../../modules/code/entities/code.entity';
import { CodeBuilder } from '../../../builder/code.builder';
import { UseYn } from '@common/enums';

const codeData = {
  스타일: [
    { code: 'STYLE_TRENDY', label: '트렌디해요' },
    { code: 'STYLE_COZY', label: '아늑해요' },
    { code: 'STYLE_ROMANTIC', label: '로맨틱해요' },
    { code: 'STYLE_MODERN', label: '모던해요' },
  ],
  '시설/서비스': [
    { code: 'SERVICE_KIND', label: '친절해요' },
    { code: 'SERVICE_FAST', label: '서비스가 빨라요' },
    { code: 'FACILITY_CLEAN', label: '깨끗해요' },
    { code: 'FACILITY_COMFORTABLE', label: '편안해요' },
  ],
  '가격/기타': [
    { code: 'PRICE_REASONABLE', label: '가격이 합리적이에요' },
    { code: 'PRICE_WORTHY', label: '가성비가 좋아요' },
    { code: 'ETC_TASTY', label: '맛있어요' },
    { code: 'ETC_PHOTOGENIC', label: '사진이 잘 나와요' },
  ],
};

const CodeFactory = localeKoSetSeederFactory(Code, (faker) => {
  const type = faker.helpers.arrayElement(Object.keys(codeData));
  const { code, label } = faker.helpers.arrayElement(codeData[type]) as { code: string; label: string };

  return new CodeBuilder()
    .setCode(code)
    .setLabel(label)
    .setSortOrder(faker.number.int({ min: 1, max: 10 }))
    .setUseYn(UseYn.YES)
    .build();
});

export default CodeFactory;
