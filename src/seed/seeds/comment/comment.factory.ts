import { Comment } from '../../../modules/comment/entities/comment.entity';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { CommentBuilder } from '../../../builder';

const CommentFactory = localeKoSetSeederFactory(Comment, (faker) =>
  new CommentBuilder().setComment(faker.lorem.sentence({ min: 5, max: 10 })).build()
);
export default CommentFactory;
