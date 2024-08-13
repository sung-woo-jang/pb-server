import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PlaceCategory } from '../../../modules/place/entities/place_category.entity';
import { Place } from '../../../modules/place/entities/place.entity';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';

export default class PlaceSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const placeCategories = await dataSource
      .getRepository(PlaceCategory)
      .createQueryBuilder('placeCategory')
      .orderBy('RANDOM()')
      .limit(10)
      .getMany();

    for (const placeCategory of placeCategories)
      await factoryManager.get(Place).saveMany(generateRandomInteger(4), { placeCategory });
  }
}
