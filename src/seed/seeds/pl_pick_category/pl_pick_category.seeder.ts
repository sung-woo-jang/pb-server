import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../../modules/user/entities';
import { PlPickCategory } from '../../../modules/pl_pick_category/entities/pl_pick_category.entity';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';

export default class PlPickCategorySeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    // 모든 사용자를 가져옵니다.
    const users = await userRepository.find();

    const minCategoriesPerUser = 2;
    const maxCategoriesPerUser = 10; // 이 값은 필요에 따라 조정할 수 있습니다.

    for (const user of users) {
      // 각 사용자에 대해 랜덤한 수의 PlPickCategory를 생성합니다.
      const numberOfCategories = generateRandomInteger(minCategoriesPerUser, maxCategoriesPerUser);

      await factoryManager.get(PlPickCategory).saveMany(numberOfCategories, { user });
    }
  }
}
