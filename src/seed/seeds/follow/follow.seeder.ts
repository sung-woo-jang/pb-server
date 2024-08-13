import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../../modules/user/entities';
import { Follow } from '../../../modules/follow/entities/follow.entity';

export default class FollowSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const users = await dataSource.getRepository(User).createQueryBuilder('user').getMany();
    for (let i = 0; i < users.length - 1; i++) {
      await factoryManager.get(Follow).save({ follower_account: users[i].id, following_account: users[i + 1].id });
      await factoryManager.get(Follow).save({ follower_account: users[i + 1].id, following_account: users[i].id });
    }
  }
}
