import { PlacePick } from '../../../modules/place_pick/entities/place_pick.entity';
import { PlacePickBuilder } from '../../../builder/place_pick.builder';
import { Place } from '../../../modules/place/entities/place.entity';
import { PlPickCategory } from '../../../modules/pl_pick_category/entities/pl_pick_category.entity';
import { setSeederFactory } from 'typeorm-extension';
import { Faker, ko } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const PlacePickFactory = setSeederFactory(PlacePick, async (faker) => {
  faker = new Faker({ locale: [ko] });
  const dataSource = await new DataSource({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(String(process.env.POSTGRES_DB_PORT), 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    entities: [__dirname + '/../../../modules/**/*.entity.{js,ts}'],
  }).initialize();
  const place = await dataSource.getRepository(Place).createQueryBuilder('place').orderBy('RANDOM()').getOne();
  const plPickCategory = await dataSource
    .getRepository(PlPickCategory)
    .createQueryBuilder('plPickCategory')
    .orderBy('RANDOM()')
    .getOne();

  return new PlacePickBuilder()
    .setAlias(faker.lorem.sentence({ min: 1, max: 1 }))
    .setMemo(faker.lorem.sentence({ min: 2, max: 4 }))
    .setLink(faker.internet.url())
    .setPlPickCategoryId(place.id)
    .setPlaceId(plPickCategory.id)
    .build();
});

export default PlacePickFactory;
