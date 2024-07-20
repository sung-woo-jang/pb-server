import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Keyword } from '../../../modules/keyword/entities';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';
import { Post } from '../../../modules/post/entities';

export default class KeywordSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const post = await dataSource.getRepository(Post).createQueryBuilder('post').orderBy('RANDOM()').getOne();

    await factoryManager.get(Keyword).saveMany(generateRandomInteger(), {
      post,
    });
  }
}
