import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Post } from '../../../modules/post/entities';
import { User } from '../../../modules/user/entities';
import { Place } from '../../../modules/place/entities/place.entity';

export default class PostSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const users = await dataSource.getRepository(User).createQueryBuilder('user').limit(10).getMany();
    const places = await dataSource.getRepository(Place).createQueryBuilder('place').limit(10).getMany();

    for (const user of users) {
      for (const place of places) {
        await factoryManager.get(Post).save({ user, place });
      }
    }
  }
}
