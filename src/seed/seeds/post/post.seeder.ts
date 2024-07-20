import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Post } from '../../../modules/post/entities';
import { User } from '../../../modules/user/entities';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';
import { Place } from '../../../modules/place/entities/place.entity';

export default class PostSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const user = await dataSource.getRepository(User).createQueryBuilder('user').orderBy('RANDOM()').getOne();
    const place = await dataSource.getRepository(Place).createQueryBuilder('place').orderBy('RANDOM()').getOne();

    await factoryManager.get(Post).saveMany(generateRandomInteger(2, 5), { user, place });
  }
}
