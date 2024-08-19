// src/seed/utils/generateSeed.ts

import { Faker } from '@faker-js/faker';

export const generateMemo = (faker: Faker): string =>
  faker.helpers
    .arrayElement([
      '여기 {feature} 좋음',
      '{menu} 맛있음',
      '{occasion}때 굿',
      '{mood}한 분위기',
      '{personal_note}',
      '{tip}',
      '또 가고 싶다',
      '{price}원 정도',
    ])
    .replace('{feature}', faker.helpers.arrayElement(['뷰', '주차', '음악', '좌석', '화장실']))
    .replace('{menu}', faker.helpers.arrayElement(['파스타', '피자', '스테이크', '샐러드', '디저트', '커피']))
    .replace('{occasion}', faker.helpers.arrayElement(['기념일', '생일', '회식', '소개팅']))
    .replace('{mood}', faker.helpers.arrayElement(['아늑', '모던', '시끌벅적', '고급', '편안']))
    .replace('{personal_note}', faker.helpers.arrayElement(['최애', '자주 감', '비밀로 하고 싶음', '추천']))
    .replace('{tip}', faker.helpers.arrayElement(['예약 필수', '주말 북적', '평일 한산']))
    .replace('{price}', faker.helpers.arrayElement(['만', '2만', '3만', '5만', '10만']));

export const generateAliasMemo = (faker: Faker) =>
  faker.helpers.arrayElement([
    '맛집러버',
    '여행마니아',
    '카페홀릭',
    '맛집탐험가',
    '방랑자',
    '미식가',
    '여행벽',
    '음식탐험가',
  ]);

export const generatePost = (faker: Faker) =>
  faker.helpers
    .arrayElement([
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
    ])
    .replace('{place}', faker.company.name())
    .replace(
      '{impression}',
      faker.helpers.arrayElement(['분위기가 너무 좋았고,', '직원분들이 친절해서 좋았고,', '가격도 합리적이고,'])
    )
    .replace('{food}', faker.helpers.arrayElement(['파스타', '피자', '스테이크', '샐러드', '디저트']))
    .replace('{highlight}', faker.helpers.arrayElement(['인테리어', '야경', '서비스', '청결도']))
    .replace(
      '{recommendation}',
      faker.helpers.arrayElement(['꼭 한번 가보세요!', '강추합니다!', '여러분도 꼭 경험해보세요.'])
    )
    .replace('{activity}', faker.helpers.arrayElement(['보드게임', '노래방', '당구', '볼링']))
    .replace(
      '{detail}',
      faker.helpers.arrayElement(['사진이 잘 나와서 좋아요.', '음식이 다 맛있어요.', '주차도 편리해요.'])
    )
    .replace('{emotion}', faker.helpers.arrayElement(['너무 행복하고', '재충전되는 느낌이에요.', '스트레스가 풀리는']))
    .replace('{scenery}', faker.helpers.arrayElement(['석양이 지는 모습', '도시 전경', '바다 풍경']))
    .replace('{specialty}', faker.helpers.arrayElement(['시그니처 메뉴', '계절 한정 메뉴', '셰프 추천 메뉴']))
    .replace(
      '{taste}',
      faker.helpers.arrayElement(['입에서 살살 녹아요.', '맛이 독특하고 좋아요.', '양도 많고 맛도 좋아요.'])
    )
    .replace('{memory}', faker.helpers.arrayElement(['친구들과 찍은 인생샷,', '맛있는 음식들,', '즐거웠던 대화,']))
    .replace(
      '{change}',
      faker.helpers.arrayElement([
        '새로운 메뉴가 추가되어 있더라구요.',
        '리모델링해서 더 예뻐졌어요.',
        '직원분들이 더 친절해진 것 같아요.',
      ])
    );
