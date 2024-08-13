import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Post } from '../../../modules/post/entities';
import { User } from '../../../modules/user/entities';
import { Like } from '../../../modules/like/entities/like.entity';

export default class LikeSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const posts = await dataSource.getRepository(Post).createQueryBuilder().limit(10).getMany();
    const users = await dataSource.getRepository(User).createQueryBuilder().limit(10).getMany();

    for (const post of posts) {
      for (const user of users) {
        await factoryManager.get(Like).save({ user, post });
      }
    }
  }
}
