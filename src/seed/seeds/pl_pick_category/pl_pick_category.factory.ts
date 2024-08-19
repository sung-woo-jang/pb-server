import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { CircleColors, PlPickCategory } from '../../../modules/pl_pick_category/entities/pl_pick_category.entity';
import { PlPickCategoryBuilder } from '../../../builder/pl_pick_category.builder';
import data from '../dummy_map';
import { generateMemo } from '../utils/generateSeed';

const customCategories = [
  '분위기',
  '맛집',
  '데이트',
  '가성비',
  '인생샷',
  '혼밥',
  '친구랑',
  '특별한 날',
  '야경',
  '빠른 식사',
  '건강식',
  '술',
  '단체 모임',
  '새로운 경험',
  '힐링',
  '아이와',
  '24시간',
  '숨은 맛집',
  '단골',
  '조용한',
];

const PlPickCategoryFactory = localeKoSetSeederFactory(PlPickCategory, (faker) =>
  new PlPickCategoryBuilder()
    .setTitle(faker.helpers.arrayElement(customCategories))
    .setLink(faker.helpers.arrayElement(data).link)
    .setPickerColor(faker.helpers.arrayElement(Object.values(CircleColors)))
    .setMemo(generateMemo(faker))
    .build()
);
export default PlPickCategoryFactory;
