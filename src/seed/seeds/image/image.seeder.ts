import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Image } from '../../../modules/post/entities/image.entity';
import { DataSource } from 'typeorm';
import { Post } from '../../../modules/post/entities';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';

export default class ImageSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const post = await dataSource.getRepository(Post).createQueryBuilder('post').orderBy('RANDOM()').getOne();

    await factoryManager.get(Image).saveMany(generateRandomInteger(4), {
      post,
    });
  }
}
