import { Injectable } from '@nestjs/common';
import { Keyword } from './entities';
import { CreateKeywordDto, UpdateKeywordDto } from './dtos';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(Keyword) private keywordRepo: Repository<Keyword>
    // private dataSource: DataSource
  ) {}

  updateOrCreateKeywords(keywords: CreateKeywordDto[] | UpdateKeywordDto[], existingKeywords: Keyword[]): Keyword[] {
    return keywords.map((keywordDto) => {
      const existingKeyword = existingKeywords.find((k) => k.id === keywordDto.id);

      if (existingKeyword) {
        existingKeyword.keyword = keywordDto.keyword;
        return existingKeyword;
      } else {
        const keywordEntity = new Keyword();
        keywordEntity.keyword = keywordDto.keyword;
        return keywordEntity;
      }
    });
  }

  findKeywordsToDelete(keywords: UpdateKeywordDto[], existingKeywords: Keyword[]): Keyword[] {
    return existingKeywords.filter(
      (existingKeyword) => !keywords.some((keywordDto) => keywordDto.id === existingKeyword.id)
    );
  }

  // 이건 쓸지말지 고민중
  async createKeywords(keywords: CreateKeywordDto[], transactionManager: EntityManager): Promise<Keyword[]> {
    // 키워드 엔티티 배열 생성
    const keywordEntities = this.updateOrCreateKeywords(keywords, []);

    // Keyword 엔티티 저장
    return await Promise.all(keywordEntities.map((keyword) => transactionManager.getRepository(Keyword).save(keyword)));
  }

  async deleteKeywords(keywords: Keyword[], transactionManager: EntityManager): Promise<void> {
    if (keywords.length === 0) {
      return null;
    }

    await transactionManager.delete(Keyword, keywords);
    // Promise.all([test, transactionManager.delete(Keyword, keywords)]);
  }
}
