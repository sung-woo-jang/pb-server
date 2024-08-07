import { Like } from '../../../modules/like/entities/like.entity';
import { LikeBuilder } from '../../../builder/like.builder';
import { setSeederFactory } from 'typeorm-extension';
import { Faker, ko } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Post } from '../../../modules/post/entities';
import { User } from '../../../modules/user/entities';

const LikeFactory = setSeederFactory(Like, async (faker) => {
  faker = new Faker({ locale: [ko] });
  const dataSource = await new DataSource({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(String(process.env.POSTGRES_DB_PORT), 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    entities: [__dirname + '/../../../modules/**/*.entity.{js,ts}'],
  }).initialize();
  const post = await dataSource.getRepository(Post).createQueryBuilder().orderBy('RANDOM()').getOne();
  const user = await dataSource.getRepository(User).createQueryBuilder().orderBy('RANDOM()').getOne();

  return new LikeBuilder().setPostId(post.id).setUserId(user.id).build();
});

export default LikeFactory;
