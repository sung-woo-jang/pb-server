import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { Follow, FollowStatus } from '../../../modules/follow/entities/follow.entity';
import { FollowBuilder } from '../../../builder/follow.builder';

const FollowFactory = localeKoSetSeederFactory(Follow, (faker) =>
  new FollowBuilder().setStatus(faker.helpers.arrayElement(Object.values(FollowStatus))).build()
);

export default FollowFactory;
