import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Post } from '../../../modules/post/entities';
import { User } from '../../../modules/user/entities';
import { Place } from '../../../modules/place/entities/place.entity';

export default class PostSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const placeRepository = dataSource.getRepository(Place);
    const postRepository = dataSource.getRepository(Post);

    const users = await userRepository.find();
    const places = await placeRepository.find();

    const minPostsPerUser = 1;
    const maxPostsPerUser = 10; // 이 값은 필요에 따라 조정할 수 있습니다.

    for (const user of users) {
      // 각 사용자에 대해 랜덤한 수의 게시물을 생성합니다.
      const numberOfPosts = Math.floor(Math.random() * (maxPostsPerUser - minPostsPerUser + 1)) + minPostsPerUser;

      const posts = [];
      for (let i = 0; i < numberOfPosts; i++) {
        // 랜덤한 장소를 선택합니다.
        const randomPlace = places[Math.floor(Math.random() * places.length)];

        const post = await factoryManager.get(Post).make({
          user: user,
          place: randomPlace,
        });
        posts.push(post);
      }

      // 생성된 게시물을 벌크 저장합니다.
      await postRepository.save(posts);
    }
  }
}
