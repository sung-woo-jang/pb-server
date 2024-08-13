import { PlacePick } from '../../../modules/place_pick/entities/place_pick.entity';
import { PlacePickBuilder } from '../../../builder/place_pick.builder';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';

const PlacePickFactory = localeKoSetSeederFactory(PlacePick, (faker) =>
  new PlacePickBuilder()
    .setAlias(faker.lorem.sentence({ min: 1, max: 1 }))
    .setMemo(faker.lorem.sentence({ min: 2, max: 4 }))
    .setLink(faker.internet.url())
    .build()
);

export default PlacePickFactory;
