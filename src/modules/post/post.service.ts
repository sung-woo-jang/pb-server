import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { KeywordService } from '../keyword/keyword.service';
import { PostException, UserException } from 'src/exception';
import { Post } from './entities';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { PostRepository } from './post.repository';
import { NewsfeedDto } from './dtos/response/newsfeed.dto';
import { UploadedFilesDto } from './dtos/uploaded-files.dto';
import { PlaceRepository } from '../place/place.repository';
import { Image } from './entities/image.entity';
import { Keyword } from '../keyword/entities';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly dataSource: DataSource,
    private userRepository: UserRepository,
    private keywordService: KeywordService,
    private readonly postRepository: PostRepository,
    private readonly placeRepository: PlaceRepository
  ) {}

  async getNewsFeeds(): Promise<NewsfeedDto[]> {
    return await this.postRepository.getNewsFeeds();
  }

  async findById(id: number): Promise<Post> {
    return await this.postRepository.findOneBy({ id });
  }

  async findByIdAndRelation(id: number, relations: string[]): Promise<Post> {
    return await this.postRepository.findOne({ where: { id }, relations });
  }

  async findAll(userId: string): Promise<Post[]> {
    return this.postRepository.findAll(userId);
  }

  async findPost(postId: number, userId: string): Promise<Post> {
    return this.postRepository.findPost(postId, userId);
  }

  async createPost(imageList: UploadedFilesDto, createPostDto: CreatePostDto, userId: string) {
    return await this.dataSource.transaction(async (manager) => {
      const user = await this.userRepository.findById(userId);
      if (!user) throw UserException.notFound();

      const place = await this.placeRepository.createPlace(createPostDto.place, manager);
      const post = await this.postRepository.createPost(createPostDto, user, place, manager);

      for await (const placeImage of imageList.placeImages)
        await manager.save(Image, { image_path: placeImage.filename, post });

      for await (const keyword of createPostDto.keywords)
        await manager.save(Keyword, { keyword: keyword.keyword, post });

      return post;
    });
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
    await this.postRepository.remove(post);
  }

  async createPostLike(postId: number, userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    const post = await this.findById(postId);

    await this.postRepository.createPostLike(post, user);
  }

  async deletePostLike(postId: number, userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    const post = await this.findById(postId);

    await this.postRepository.deletePostLike(post, user);
  }
}
