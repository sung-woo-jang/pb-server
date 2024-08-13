import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Image } from '../../../modules/post/entities/image.entity';
import { DataSource } from 'typeorm';
import { Post } from '../../../modules/post/entities';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';

export default class ImageSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const posts = await dataSource.getRepository(Post).createQueryBuilder('post').limit(10).getMany();

    for (const post of posts) {
      await factoryManager.get(Image).saveMany(generateRandomInteger(2, 10), {
        post,
      });
    }
  }
}
