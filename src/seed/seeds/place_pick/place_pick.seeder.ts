import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Place } from '../../../modules/place/entities/place.entity';
import { PlPickCategory } from '../../../modules/pl_pick_category/entities/pl_pick_category.entity';
import { PlacePick } from '../../../modules/place_pick/entities/place_pick.entity';

export default class PlacePickSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const place = await dataSource.getRepository(Place).createQueryBuilder('place').getOne();
    const plPickCategory = await dataSource.getRepository(PlPickCategory).createQueryBuilder('plPickCategory').getOne();
    await factoryManager.get(PlacePick).saveMany(2, { place, plPickCategory });
  }
}
