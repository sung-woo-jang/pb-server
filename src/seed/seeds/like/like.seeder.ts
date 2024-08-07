import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Faker, ko } from '@faker-js/faker';
import { Post } from '../../../modules/post/entities';
import { User } from '../../../modules/user/entities';
import { Like } from '../../../modules/like/entities/like.entity';

export default class LikeSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const faker = new Faker({ locale: [ko] });
    const posts = await dataSource.getRepository(Post).createQueryBuilder().getMany();
    const users = await dataSource.getRepository(User).createQueryBuilder().getMany();

    const likeRepository = dataSource.getRepository(Like);
  }
}
