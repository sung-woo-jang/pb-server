import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Post } from '../../../modules/post/entities';
import { User } from '../../../modules/user/entities';
import { Like } from '../../../modules/like/entities/like.entity';

export default class LikeSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const postRepository = dataSource.getRepository(Post);
    const userRepository = dataSource.getRepository(User);
    const likeRepository = dataSource.getRepository(Like);

    const posts = await postRepository.find();
    const users = await userRepository.find();

    for (const post of posts) {
      // 각 게시물에 대해 랜덤한 수의 사용자가 좋아요를 누릅니다.
      const numberOfLikes = Math.floor(Math.random() * (users.length + 1)); // 0부터 전체 사용자 수까지의 랜덤한 수

      // 사용자 배열을 섞습니다.
      const shuffledUsers = users.sort(() => 0.5 - Math.random());

      const likes = [];
      for (let i = 0; i < numberOfLikes; i++) {
        const like = factoryManager.get(Like).make({
          user: shuffledUsers[i],
          post: post,
        });
        likes.push(like);
      }

      // 생성된 좋아요를 벌크 저장합니다.
      await likeRepository.save(likes);
    }
  }
}
