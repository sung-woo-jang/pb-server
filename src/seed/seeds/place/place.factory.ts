import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { Place } from '../../../modules/place/entities/place.entity';
import { PlaceBuilder } from '../../../builder/place.builder';
import data from '../dummy_map';

const PlaceFactory = localeKoSetSeederFactory(Place, (faker) => {
  const generateDummyEmbedding = (dimension: number = 1536): number[] => {
    return Array.from({ length: dimension }, () => faker.number.float({ min: -1, max: 1 }));
  };

  const randomPlace = faker.helpers.arrayElement(data);
  return (
    new PlaceBuilder()
      .setTitle(randomPlace.title)
      .setAddress(randomPlace.address)
      .setRoadAddress(randomPlace.roadAddress)
      .setDescription(randomPlace.description)
      // .setTelephone(faker.helpers.fromRegExp(/010-[0-9]{4}-[0-9]{4}/))
      .setTelephone(randomPlace.telephone)
      .setMapx(randomPlace.mapx)
      .setMapy(randomPlace.mapy)
      .setEmbedding(generateDummyEmbedding())
      .build()
  );
});
export default PlaceFactory;
