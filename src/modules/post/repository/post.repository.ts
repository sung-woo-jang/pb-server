import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Post } from '../entities';
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

  feedQuery() {
    return this.createQueryBuilder('post')
      .select(['post.content', 'post.visitDate', 'post.rate', 'post.id', 'post.createdAt'])
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.keywords', 'keywords')
      .leftJoin('post.likes', 'like')
      .addSelect(['like.user_id'])
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

      .leftJoinAndSelect('place.placeCategory', 'placeCategory')
      .leftJoinAndSelect('post.images', 'images');
  }

  async getNewsFeeds(userIds: string[]) {
    return await this.feedQuery()
      .where('post.user.id IN (:...userIds)', { userIds })
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  async getPostDetail(postId: number) {
    return await this.feedQuery().where('post.id = :postId', { postId }).getOne();
  }
}
