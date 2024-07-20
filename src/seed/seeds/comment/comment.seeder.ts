import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../../modules/user/entities';
import { Comment } from '../../../modules/comment/entities/comment.entity';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';
import { Post } from '../../../modules/post/entities';

export default class CommentSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const user = await dataSource.getRepository(User).createQueryBuilder().orderBy('RANDOM()').getOne();
    const post = await dataSource.getRepository(Post).createQueryBuilder('post').orderBy('RANDOM()').getOne();

    await factoryManager.get(Comment).saveMany(generateRandomInteger(1, 3), { user, post });
  }
}
