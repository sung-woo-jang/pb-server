import { PlacePick } from '../../../modules/place_pick/entities/place_pick.entity';
import { PlacePickBuilder } from '../../../builder/place_pick.builder';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { generateAliasMemo, generateMemo } from '../utils/generateSeed';

const PlacePickFactory = localeKoSetSeederFactory(PlacePick, (faker) =>
  new PlacePickBuilder()
    .setAlias(generateAliasMemo(faker))
    .setMemo(generateMemo(faker))
    .setLink(faker.internet.url())
    .build()
);

export default PlacePickFactory;
