import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { PlaceCategory } from '../../../modules/place/entities/place_category.entity';
import { PlaceCategoryBuilder } from '../../../builder/place_category.builder';

const PlaceCategoryFactory = localeKoSetSeederFactory(PlaceCategory, (faker) =>
  new PlaceCategoryBuilder()
    .setPlaceCategoryName(faker.lorem.sentence({ min: 1, max: 2 }))
    .setPlaceCategoryNameDetail(faker.lorem.sentence({ min: 3, max: 4 }))
    .build()
);

export default PlaceCategoryFactory;
