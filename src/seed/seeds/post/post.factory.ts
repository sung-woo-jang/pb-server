import { Post } from '../../../modules/post/entities';
import { PostBuilder } from '../../../builder/post.builder';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';

const postTemplates = [
  '오늘 {place}에 다녀왔어요. {impression} 다음에 또 오고 싶네요!',
  '{place} 데이트 성공적 👍 {food}도 맛있고 분위기도 좋았어요.',
  '{place}의 {highlight}이 정말 인상적이었어요. {recommendation}',
  '친구들과 {place}에서 즐거운 시간 보냈어요. {activity}하는 재미가 쏠쏠하네요.',
  '{place} 처음 가봤는데 기대 이상이었어요! {detail}',
  '{place}에서의 하루. {emotion} 힐링되는 시간이었습니다.',
  '{place} 뷰가 진짜 예술이에요. {scenery} 완전 감동!',
  '{place}의 {specialty}을 먹어봤어요. {taste} 역시 유명한 데는 이유가 있네요.',
  '{place}에서 특별한 추억 만들고 왔어요. {memory} 잊지 못할 거 같아요.',
  '오랜만에 {place} 방문! {change} 변한 것도 있고 그대로인 것도 있네요.',
];

const impressions = ['분위기가 너무 좋았고,', '직원분들이 친절해서 좋았고,', '가격도 합리적이고,'];
const foods = ['파스타', '피자', '스테이크', '샐러드', '디저트'];
const highlights = ['인테리어', '야경', '서비스', '청결도'];
const recommendations = ['꼭 한번 가보세요!', '강추합니다!', '여러분도 꼭 경험해보세요.'];
const activities = ['보드게임', '노래방', '당구', '볼링'];
const details = ['사진이 잘 나와서 좋아요.', '음식이 다 맛있어요.', '주차도 편리해요.'];
const emotions = ['너무 행복하고', '재충전되는 느낌이에요.', '스트레스가 풀리는'];
const sceneries = ['석양이 지는 모습', '도시 전경', '바다 풍경'];
const specialties = ['시그니처 메뉴', '계절 한정 메뉴', '셰프 추천 메뉴'];
const tastes = ['입에서 살살 녹아요.', '맛이 독특하고 좋아요.', '양도 많고 맛도 좋아요.'];
const memories = ['친구들과 찍은 인생샷,', '맛있는 음식들,', '즐거웠던 대화,'];
const changes = [
  '새로운 메뉴가 추가되어 있더라구요.',
  '리모델링해서 더 예뻐졌어요.',
  '직원분들이 더 친절해진 것 같아요.',
];

const PostFactory = localeKoSetSeederFactory(Post, (faker) => {
  const template = faker.helpers.arrayElement(postTemplates);
  const place = faker.company.name();

  const content = template
    .replace('{place}', place)
    .replace('{impression}', faker.helpers.arrayElement(impressions))
    .replace('{food}', faker.helpers.arrayElement(foods))
    .replace('{highlight}', faker.helpers.arrayElement(highlights))
    .replace('{recommendation}', faker.helpers.arrayElement(recommendations))
    .replace('{activity}', faker.helpers.arrayElement(activities))
    .replace('{detail}', faker.helpers.arrayElement(details))
    .replace('{emotion}', faker.helpers.arrayElement(emotions))
    .replace('{scenery}', faker.helpers.arrayElement(sceneries))
    .replace('{specialty}', faker.helpers.arrayElement(specialties))
    .replace('{taste}', faker.helpers.arrayElement(tastes))
    .replace('{memory}', faker.helpers.arrayElement(memories))
    .replace('{change}', faker.helpers.arrayElement(changes));

  return new PostBuilder()
    .setContent(content)
    .setVisitDate(
      faker.date.between({
        from: new Date('2024-01-01'),
        to: new Date('2024-07-20'),
      })
    )
    .setRate(generateRandomInteger(1, 3))
    .build();
});
export default PostFactory;
