import { Comment } from '../../../modules/comment/entities/comment.entity';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { CommentBuilder } from '../../../builder/comment.builder';

const commentTemplates = [
  '{positive} {detail}',
  '{question}',
  '{agreement} {addition}',
  '{compliment}',
  '{request}',
  '{reaction} {emotion}',
  '{observation}',
  '{recommendation}',
  '{personal}',
  '{humor}',
];

const positives = ['와 정말 좋아 보여요!', '멋지네요!', '대박이에요!', '너무 부럽습니다~'];
const details = ['어디서 찍으신 거예요?', '분위기가 너무 좋아 보여요.', '음식이 맛있어 보여요!', '꼭 가보고 싶네요.'];
const questions = ['혹시 위치가 어디인가요?', '가격대는 어떻게 되나요?', '예약은 필수인가요?', '주차는 편한가요?'];
const agreements = ['저도 거기 가봤어요!', '맞아요,', '진짜 그렇죠?'];
const additions = ['다음에 또 가고 싶어요.', '분위기가 정말 좋더라구요.', '친구들이랑 가기 좋은 것 같아요.'];
const compliments = [
  '사진 정말 잘 나왔네요!',
  '옷 스타일 멋져요~',
  '표정이 너무 행복해 보여요 :)',
  '늘 좋은 곳만 찾아가시는 것 같아요!',
];
const requests = [
  '다음에 저도 데려가주세요 ㅎㅎ',
  '더 자세한 후기 부탁드려요!',
  '메뉴 추천해주세요!',
  '언제 가셨어요? 주말에도 사람 많나요?',
];
const reactions = ['우와,', '헐,', '오..'];
const emotions = ['너무 좋아 보여요!', '정말 부럽습니다 ㅠㅠ', '저도 가고 싶어요~', '완전 힐링되겠어요.'];
const observations = [
  '요즘 그곳이 핫하더라구요.',
  '인스타에서 많이 보이던 곳이에요!',
  '분위기가 진짜 좋아 보여요.',
  '데이트 코스로 딱이겠어요.',
];
const recommendations = [
  '다들 한 번씩 가보세요!',
  '강추합니다 👍',
  '꼭 가보세요, 후회 안 해요!',
  '여기 진짜 맛있어요, 꼭 드셔보세요.',
];
const personals = [
  '저도 얼마 전에 다녀왔어요 ㅎㅎ',
  '여기 저도 가본 적 있는데 진짜 좋더라구요!',
  '저는 작년에 갔었는데 또 가고 싶네요.',
  '친구가 추천해줘서 가봤는데 대만족이었어요.',
];
const humors = [
  '제 지갑이 울고 있어요 😭',
  '살찌는 소리가 들리네요 🍔',
  '다이어트는 내일부터...!',
  '여기서 일하면 매일 행복하겠어요 ㅋㅋ',
];

const CommentFactory = localeKoSetSeederFactory(Comment, (faker) => {
  const template = faker.helpers.arrayElement(commentTemplates);

  const comment = template
    .replace('{positive}', faker.helpers.arrayElement(positives))
    .replace('{detail}', faker.helpers.arrayElement(details))
    .replace('{question}', faker.helpers.arrayElement(questions))
    .replace('{agreement}', faker.helpers.arrayElement(agreements))
    .replace('{addition}', faker.helpers.arrayElement(additions))
    .replace('{compliment}', faker.helpers.arrayElement(compliments))
    .replace('{request}', faker.helpers.arrayElement(requests))
    .replace('{reaction}', faker.helpers.arrayElement(reactions))
    .replace('{emotion}', faker.helpers.arrayElement(emotions))
    .replace('{observation}', faker.helpers.arrayElement(observations))
    .replace('{recommendation}', faker.helpers.arrayElement(recommendations))
    .replace('{personal}', faker.helpers.arrayElement(personals))
    .replace('{humor}', faker.helpers.arrayElement(humors));
  return new CommentBuilder().setComment(comment).build();
});
export default CommentFactory;
