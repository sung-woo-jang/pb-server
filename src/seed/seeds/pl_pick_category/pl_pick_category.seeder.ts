import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';
import { User } from '../../../modules/user/entities';
import { PlPickCategory } from '../../../modules/pl_pick_category/entities/pl_pick_category.entity';

export default class PlPickCategorySeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const user = await dataSource.getRepository(User).createQueryBuilder().orderBy('RANDOM()').getOne();
    await factoryManager.get(PlPickCategory).saveMany(generateRandomInteger(2, 5), {
      user,
    });
  }
}
