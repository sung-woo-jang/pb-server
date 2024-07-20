import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { KeywordService } from '../keyword/keyword.service';
import { PostException, UserException } from 'src/exception';
import { Post } from './entities';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { PostBuilder } from '../../builder/post.builder';
import { PostRepository } from './post.repository';
import { NewsfeedDto } from './dtos/response/newsfeed.dto';

@Injectable()
export class PostService {
  constructor(
    private userService: UserService,
    private keywordService: KeywordService,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private readonly postRepository: PostRepository
  ) {}

  async getNewsFeeds(): Promise<NewsfeedDto[]> {
    return await this.postRepository.getNewsFeeds();
  }

  async findById(id: number): Promise<Post> {
    return await this.postRepo.findOneBy({ id });
  }

  async findByIdAndRelation(id: number, relations: string[]): Promise<Post> {
    return await this.postRepo.findOne({ where: { id }, relations });
  }

  async createPost({ keywords, rate, visitDate, content }: Partial<CreatePostDto>, userId: string): Promise<void> {
    const user = await this.userService.findById(userId);
    if (!user) throw UserException.notFound();

    const savedKeywords = this.keywordService.updateOrCreateKeywords(keywords, []);

    // 새 Post 엔티티 생성
    const post = new PostBuilder()
      .setContent(content)
      .setVisitDate(visitDate)
      .setRate(rate)
      .setAuthor(user)
      .setKeywords(savedKeywords)
      .build();

    // Post 엔티티 저장 (CASCADE설정으로 Keyword 엔티티도 자동으로 저장)
    await this.postRepo.save(post);
  }

  async updatePost(attrs: Partial<UpdatePostDto>, transactionManager: EntityManager): Promise<void> {
    const { id: postId, content, visitDate, rate, keywords } = attrs;

    // 기존 Post 조회
    const post = await this.findByIdAndRelation(postId, ['keywords']);
    if (!post) {
      throw PostException.notFound();
    }

    post.content = content;
    post.visitDate = visitDate;
    post.rate = rate;

    // 기존 키워드와 새로운 키워드를 비교하여 추가, 수정, 삭제 작업 수행

    // 삭제된 키워드 처리
    const keywordsToDelete = this.keywordService.findKeywordsToDelete(keywords, post.keywords);

    // 삭제된 키워드 삭제
    await this.keywordService.deleteKeywords(keywordsToDelete, transactionManager);

    // // 업데이트된 키워드 설정
    post.keywords = this.keywordService.updateOrCreateKeywords(keywords, post.keywords);

    // // Post 엔티티 저장 (Keyword 엔티티도 자동으로 저장됩니다)
    await transactionManager.save(Post, post);
  }

  async deletePost(postId: number): Promise<void> {
    const post = await this.findById(postId);
    if (!post) {
      throw PostException.notFound();
    }

    // Post 엔티티 삭제 (CASCADE설정으로 Keyword 엔티티도 자동으로 삭제)
    await this.postRepo.remove(post);
  }

  async createPostLike(postId: number, userId: string): Promise<void> {
    const user = await this.userService.findById(userId);
    const post = await this.findByIdAndRelation(postId, ['likedByUsers']);

    if (user && post) {
      post.likedByUsers.push(user);
      await this.postRepo.save(post);
    }
  }

  async deletePostLike(postId: number, userId: string): Promise<void> {
    const post = await this.findByIdAndRelation(postId, ['likedByUsers']);
    if (post) {
      post.likedByUsers = post.likedByUsers.filter((user) => user.id !== userId);

      await this.postRepo.save(post);
    }

    // try {
    //   await this.dataSource
    //     .createQueryBuilder()
    //     .delete()
    //     .from('user_post_like')
    //     .where('userId = :userId', { userId })
    //     .andWhere('postId = :postId', { postId })
    //     .execute();
    // } catch (error) {
    //   console.error('Error removing like:', error);
    //   throw error;
    // }
  }
}
