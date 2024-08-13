import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Post } from '../entities';
import { PostException } from '../../../exception';
import { User } from '../../user/entities';
import { CreatePostDto } from '../dtos';
import { PostBuilder } from '../../../builder/post.builder';
import { Place } from '../../place/entities/place.entity';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async createPost(createPostDto: CreatePostDto, user: User, place: Place, transactionManager: EntityManager) {
    return await transactionManager.save(Post, {
      ...new PostBuilder()
        .setContent(createPostDto.content)
        .setVisitDate(createPostDto.visitDate)
        .setRate(createPostDto.rate)
        .build(),
      user,
      place,
    });
  }
  async getNewsFeeds(user: User) {
    return await this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('post.keywords', 'keywords')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoin('post.place', 'place')
      .addSelect([
        'place.id',
        'place.createdAt',
        'place.updatedAt',
        'place.title',
        'place.address',
        'place.road_address',
        'place.description',
        'place.telephone',
        'place.mapx',
        'place.mapy',
      ])
      .leftJoinAndSelect('post.images', 'images')
      .getMany();
  }

  async findAll(userId: string): Promise<Post[]> {
    return await this.dataSource
      .createQueryBuilder(Post, 'post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.keywords', 'keyword')
      .leftJoinAndSelect('post.comments', 'comment')
      // .leftJoinAndSelect('post.likes', 'user_post_like')
      .leftJoinAndSelect('post.likes', 'user_post_like', 'user_post_like.user_id = :userId', {
        userId,
      })
      .orderBy('post.id', 'DESC')
      .getMany();
  }

  async findPost(postId: number, userId: string): Promise<Post> {
    const post = await this.dataSource
      .createQueryBuilder(Post, 'post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.keywords', 'keyword')
      .leftJoinAndSelect('post.comments', 'comment')
      // .leftJoinAndSelect('post.likes', 'user_post_like')
      .leftJoinAndSelect('post.likes', 'user_post_like', 'user_post_like.user_id = :userId', {
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
}
