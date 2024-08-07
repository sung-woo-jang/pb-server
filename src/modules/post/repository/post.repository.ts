import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Post } from '../entities';
import { NewsfeedDto } from '../../newsfeed/dto/response/newsfeed.dto';
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
  async getNewsFeeds(): Promise<NewsfeedDto[]> {
    return await this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user') // 게시글 작성자와의 관계 조인
      .leftJoinAndSelect('post.likes', 'likes') // 게시글 좋아요와의 관계 조인
      .leftJoinAndSelect('post.keywords', 'keywords') // 게시글 키워드와의 관계 조인
      .leftJoinAndSelect('post.comments', 'comments') // 게시글 댓글과의 관계 조인
      .leftJoinAndSelect('post.place', 'place') // 게시글과 장소와의 관계 조인
      .leftJoinAndSelect('post.images', 'images') // 게시글 이미지와의 관계 조인
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
