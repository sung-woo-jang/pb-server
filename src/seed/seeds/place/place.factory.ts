import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { Place } from '../../../modules/place/entities/place.entity';
import { PlaceBuilder } from '../../../builder/place.builder';

export default localeKoSetSeederFactory(Place, (faker) =>
  new PlaceBuilder()
    .setTitle(faker.lorem.sentence({ min: 1, max: 2 }))
    .setAddress(faker.location.city())
    .setRoadAddress(faker.location.city())
    .setDescription(faker.lorem.sentence({ min: 3, max: 5 }))
    .setTelephone(faker.phone.number('010-####-####'))
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
    .build()
);
