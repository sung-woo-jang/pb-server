import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { CircleColors, PlPickCategory } from '../../../modules/pl_pick_category/entities/pl_pick_category.entity';
import { PlPickCategoryBuilder } from '../../../builder/pl_pick_category.builder';

const PlPickCategoryFactory = localeKoSetSeederFactory(PlPickCategory, (faker) =>
  new PlPickCategoryBuilder()
    .setTitle(faker.lorem.sentence({ min: 1, max: 2 }))
    .setLink(faker.internet.url({ protocol: 'https', appendSlash: false }))
    .setPickerColor(faker.helpers.arrayElement(Object.values(CircleColors)))
    .setMemo(faker.lorem.sentence({ min: 3, max: 6 }))
    .build()
);
export default PlPickCategoryFactory;
