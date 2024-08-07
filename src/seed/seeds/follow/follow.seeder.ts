import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../../modules/user/entities';
import { Follow } from '../../../modules/follow/entities/follow.entity';

export default class FollowSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const [follower, following] = await dataSource.getRepository(User).createQueryBuilder('user').limit(10).getMany();
    await factoryManager.get(Follow).save({ follower_account: follower.id, following_account: following.id });
  }
}
