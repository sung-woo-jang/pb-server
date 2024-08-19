import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { CircleColors, PlPickCategory } from '../../../modules/pl_pick_category/entities/pl_pick_category.entity';
import { PlPickCategoryBuilder } from '../../../builder/pl_pick_category.builder';
import data from '../dummy_map';

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

const memoTemplates = [
  '여기 {feature} 좋음',
  '{menu} 맛있',
  '{occasion}때 굿',
  '{mood}한 분위기',
  '{personal_note}',
  '{tip}',
  '{rating}/5',
  '{emotion} 😊',
  '또 가고 싶다',
  '{price}원 정도',
];

const features = ['뷰', '주차', '음악', '좌석', '화장실'];
const menus = ['파스타', '피자', '스테이크', '샐러드', '디저트', '커피'];
const occasions = ['기념일', '생일', '회식', '소개팅'];
const moods = ['아늑', '모던', '시끌벅적', '고급', '편안'];
const personal_notes = ['최애', '자주 감', '비밀로 하고 싶음', '추천'];
const tips = ['예약 필수', '주말 북적', '평일 한산'];
const ratings = ['3', '3.5', '4', '4.5', '5'];
const emotions = ['좋아', '만족', '행복', '최고'];
const prices = ['만', '2만', '3만', '5만', '10만'];

const PlPickCategoryFactory = localeKoSetSeederFactory(PlPickCategory, (faker) =>
  new PlPickCategoryBuilder()
    .setTitle(faker.helpers.arrayElement(customCategories))
    .setLink(faker.helpers.arrayElement(data).link)
    .setPickerColor(faker.helpers.arrayElement(Object.values(CircleColors)))
    .setMemo(
      faker.helpers
        .arrayElement(memoTemplates)
        .replace('{feature}', faker.helpers.arrayElement(features))
        .replace('{menu}', faker.helpers.arrayElement(menus))
        .replace('{occasion}', faker.helpers.arrayElement(occasions))
        .replace('{mood}', faker.helpers.arrayElement(moods))
        .replace('{personal_note}', faker.helpers.arrayElement(personal_notes))
        .replace('{tip}', faker.helpers.arrayElement(tips))
        .replace('{rating}', faker.helpers.arrayElement(ratings))
        .replace('{emotion}', faker.helpers.arrayElement(emotions))
        .replace('{price}', faker.helpers.arrayElement(prices))
    )
    .build()
);
export default PlPickCategoryFactory;
