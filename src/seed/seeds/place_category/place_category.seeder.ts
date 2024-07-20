import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PlaceCategory } from '../../../modules/place/entities/place_category.entity';

export default class PlaceCategorySeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    await factoryManager.get(PlaceCategory).save();
  }
}
