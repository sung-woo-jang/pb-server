import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../../modules/user/entities';
import { Comment } from '../../../modules/comment/entities/comment.entity';
import { Post } from '../../../modules/post/entities';

export default class CommentSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const postRepository = dataSource.getRepository(Post);
    const commentRepository = dataSource.getRepository(Comment);

    const users = await userRepository.find();
    const posts = await postRepository.find();

    const minCommentsPerPost = 1; // 각 게시물당 최소 댓글 수
    const maxCommentsPerPost = 5; // 각 게시물당 최대 댓글 수

    for (const post of posts) {
      const commentCount =
        Math.floor(Math.random() * (maxCommentsPerPost - minCommentsPerPost + 1)) + minCommentsPerPost;

      for (let i = 0; i < commentCount; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const comment = await factoryManager.get(Comment).make({ user: randomUser, post: post });
        await commentRepository.save(comment);
      }
    }
  }
}
