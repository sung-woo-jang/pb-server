import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { KeywordService } from '../keyword/keyword.service';
import { UserException } from 'src/exception';
import { Post } from './entities';
import { User } from '../user/entities';
import { CreatePostDto } from './dtos';
import { Keyword } from '../keyword/entities';

@Injectable()
export class PostService {
  constructor(
    private userSerivce: UserService,
    private keywordSerivce: KeywordService,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Keyword) private keyRepo: Repository<Keyword>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async findById(id: number): Promise<Post> {
    return await this.postRepo.findOneBy({ id });
  }

  async findByIdAndRelation(id: number, relations: string[]): Promise<Post> {
    return await this.postRepo.findOne({ where: { id }, relations });
  }

  async createPost(attrs: Partial<CreatePostDto>, transactionManager: EntityManager, userId: string): Promise<void> {
    const { content, visitDate, rate, keywords, imageList } = attrs;

    const user = await this.userSerivce.findById(userId);
    if (!user) {
      throw UserException.userNotFound();
    }

    const savedKeywords = await this.keywordSerivce.createKeywords(keywords, transactionManager);

    // 새 Post 엔티티 생성
    const post = new Post();
    post.content = content;
    post.visitDate = visitDate;
    post.rate = rate;
    post.user = user;
    post.keywords = savedKeywords;

    // Post 엔티티 저장 (Keyword 엔티티도 자동으로 postId 업데이트)
    await transactionManager.getRepository(Post).save(post);
  }

  async createPostLike(postId: number, userId: string): Promise<void> {
    const post = await this.findById(postId);
    const user = await this.userSerivce.findById(userId);

    user.likedPosts = [...user.likedPosts, post];
    // post.likedByUsers = [...post.likedByUsers, user];

    await this.userRepo.save(user);
    // await this.postRepo.save(post);
  }

  // async updatePost(postId: number, createPostDto: CreatePostDto): Promise<Post> {
  //   const { content, visitDate, rate, keywords, imageList } = createPostDto;

  //   // 기존 Post 조회
  //   const post = await this.findByIdAndRelation(postId, ['keywords']);
  //   if (!post) {
  //     // throw new NotFoundException(`Post with ID ${postId} not found`);
  //   }

  //   post.content = content;
  //   post.visitDate = visitDate;
  //   post.rate = rate;

  //   // 기존 키워드와 새로운 키워드를 비교하여 추가, 수정, 삭제 작업 수행
  //   const existingKeywords = post.keywords;
  //   const newKeywordEntities = keywords.map((keywordDto) => {
  //     const existingKeyword = existingKeywords.find((k) => k.id === keywordDto.id);

  //     if (existingKeyword) {
  //       existingKeyword.keyword = keywordDto.keyword;
  //       return existingKeyword;
  //     } else {
  //       const keywordEntity = new Keyword();
  //       keywordEntity.keyword = keywordDto.keyword;
  //       keywordEntity.post = post;
  //       return keywordEntity;
  //     }
  //   });

  //   // 삭제된 키워드 처리
  //   const keywordsToDelete = existingKeywords.filter(
  //     (existingKeyword) => !keywords.some((keywordDto) => keywordDto.id === existingKeyword.id)
  //   );

  //   // 업데이트된 키워드 설정
  //   post.keywords = newKeywordEntities;

  //   // Post 엔티티 저장 (Keyword 엔티티도 자동으로 저장됩니다)
  //   // await this.postRepository.save(post);

  //   // // 삭제된 키워드 삭제
  //   // if (keywordsToDelete.length > 0) {
  //   //   await this.keywordRepository.remove(keywordsToDelete);
  //   // }

  //   return post;
  // }
}
