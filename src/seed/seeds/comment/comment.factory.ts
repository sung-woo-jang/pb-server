import { Comment } from '../../../modules/comment/entities/comment.entity';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { CommentBuilder } from '../../../builder';

export default localeKoSetSeederFactory(Comment, (faker) => {
  return new CommentBuilder().setComment(faker.lorem.sentence({ min: 5, max: 10 })).build();
});
