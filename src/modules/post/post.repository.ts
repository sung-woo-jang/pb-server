import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post, UserPostLike } from './entities';
import { NewsfeedDto } from './dtos/response/newsfeed.dto';
import { PostException } from 'src/exception';
import { User } from '../user/entities';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }
  async getNewsFeeds(): Promise<NewsfeedDto[]> {
    return await this.find({
      relations: {
        place: true,
        keywords: true,
        user: true,
        likedByUsers: true,
        comments: true,
        images: true,
      },
    });
  }

  async findAll(userId: string): Promise<Post[]> {
    const test = await this.dataSource
      .createQueryBuilder(Post, 'post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.keywords', 'keyword')
      .leftJoinAndSelect('post.comments', 'comment')
      // .leftJoinAndSelect('post.likedByUsers', 'user_post_like')
      .leftJoinAndSelect('post.likedByUsers', 'user_post_like', 'user_post_like.user_id = :userId', {
        userId,
      })
      .orderBy('post.id', 'DESC')
      .getMany();

    console.log(test);
    return test;
  }

  async findPost(postId: number, userId: string): Promise<Post> {
    const post = await this.dataSource
      .createQueryBuilder(Post, 'post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.keywords', 'keyword')
      .leftJoinAndSelect('post.comments', 'comment')
      // .leftJoinAndSelect('post.likedByUsers', 'user_post_like')
      .leftJoinAndSelect('post.likedByUsers', 'user_post_like', 'user_post_like.user_id = :userId', {
        userId,
      })
      .where('post.id = :postId', { postId })
      .orderBy('post.id', 'DESC')
      .getOne();

    if (!post) {
      throw PostException.notFound();
    }

    return post;
  }

  async createPostLike(post: Post, user: User): Promise<UserPostLike> {
    if (!user || !post) {
      throw PostException.postAndUserNotFound();
    }

    const userPostLike = await this.dataSource.getRepository(UserPostLike).create({ post, user });
    // userPostLike.post = post;
    // userPostLike.user = user;
    return await this.dataSource.getRepository(UserPostLike).save(userPostLike);
  }

  async deletePostLike(post: Post, user: User) {
    if (!user || !post) {
      throw PostException.postAndUserNotFound();
    }

    const userPostLike = await this.dataSource.getRepository(UserPostLike).findOne({ where: { user, post } });
    return await this.dataSource.getRepository(UserPostLike).remove(userPostLike);
  }
}
