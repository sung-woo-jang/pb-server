import { Post } from '../../../modules/post/entities';
import { PostBuilder } from '../../../builder/post.builder';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';

const PostFactory = localeKoSetSeederFactory(Post, (faker) =>
  new PostBuilder()
    .setContent(faker.lorem.sentence({ min: 3, max: 5 }))
    .setVisitDate(
      faker.date.between({
        from: new Date('2024-01-01'),
        to: new Date('2024-07-20'),
      })
    )
    .setRate(generateRandomInteger(1, 3))
    .build()
);
export default PostFactory;
