import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { Place } from '../../../modules/place/entities/place.entity';
import { PlaceBuilder } from '../../../builder/place.builder';

const PlaceFactory = localeKoSetSeederFactory(Place, (faker) => {
  const generateDummyEmbedding = (dimension: number = 1536): number[] => {
    return Array.from({ length: dimension }, () => faker.number.float({ min: -1, max: 1 }));
  };

  const title = faker.lorem.sentence({ min: 1, max: 2 });

  return new PlaceBuilder()
    .setTitle(title)
    .setAddress(faker.location.city())
    .setRoadAddress(faker.location.city())
    .setDescription(faker.lorem.sentence({ min: 3, max: 5 }))
    .setTelephone(faker.helpers.fromRegExp(/010-[0-9]{4}-[0-9]{4}/))
    .setMapx(
      faker.location.longitude({
        min: 126.470643,
        max: 127.269311,
        precision: 6,
      })
    )
    .setMapy(
      faker.location.latitude({
        min: 37.375325,
        max: 37.715133,
        precision: 6,
      })
    )
    .setEmbedding(generateDummyEmbedding())
    .build();
});
export default PlaceFactory;
