import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../../modules/user/entities';
import { Comment } from '../../../modules/comment/entities/comment.entity';
import { Post } from '../../../modules/post/entities';

export default class CommentSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const users = await dataSource.getRepository(User).createQueryBuilder().limit(10).getMany();
    const posts = await dataSource.getRepository(Post).createQueryBuilder().limit(10).getMany();

    for (const user of users) {
      for (const post of posts) {
        await factoryManager.get(Comment).save({ user, post });
      }
    }
  }
}
