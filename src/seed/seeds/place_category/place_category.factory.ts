import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { PlaceCategory } from '../../../modules/place/entities/place_category.entity';
import { PlaceCategoryBuilder } from '../../../builder/place_category.builder';
import data from '../dummy_map';

const PlaceCategoryFactory = localeKoSetSeederFactory(PlaceCategory, (faker) => {
  const randomCategoryName = faker.helpers.arrayElement(data);
  return new PlaceCategoryBuilder()
    .setPlaceCategoryName(randomCategoryName.place_category_name)
    .setPlaceCategoryNameDetail(randomCategoryName.place_category_name_detail)
    .build();
});

export default PlaceCategoryFactory;
