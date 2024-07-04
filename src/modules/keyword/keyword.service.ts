import { Injectable } from '@nestjs/common';
import { Keyword } from './entities';
import { CreateKeywordDto } from './dtos';
import { EntityManager } from 'typeorm';

@Injectable()
export class KeywordService {
  setKeywordEntities(keywords: CreateKeywordDto[]) {
    const keywordEntities = keywords.map((arrKeyword) => {
      const keywordEntity = new Keyword();
      keywordEntity.keyword = arrKeyword.keyword;
      return keywordEntity;
    });

    return keywordEntities;
  }

  async createKeywords(keywords: CreateKeywordDto[], transactionManager: EntityManager): Promise<Keyword[]> {
    // 키워드 엔티티 배열 생성
    const keywordEntities = this.setKeywordEntities(keywords);

    // Keyword 엔티티 저장
    return await Promise.all(keywordEntities.map((keyword) => transactionManager.getRepository(Keyword).save(keyword)));
  }
}
