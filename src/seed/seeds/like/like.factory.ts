import { Like } from '../../../modules/like/entities/like.entity';
import { LikeBuilder } from '../../../builder/like.builder';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';

const LikeFactory = localeKoSetSeederFactory(Like, (faker) => new LikeBuilder().build());

export default LikeFactory;
