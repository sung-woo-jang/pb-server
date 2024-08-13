import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../../modules/user/entities';
import { PlPickCategory } from '../../../modules/pl_pick_category/entities/pl_pick_category.entity';

export default class PlPickCategorySeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const users = await dataSource.getRepository(User).createQueryBuilder().orderBy('RANDOM()').limit(10).getMany();

    for (const user of users)
      await factoryManager.get(PlPickCategory).save({
        user,
      });
  }
}
