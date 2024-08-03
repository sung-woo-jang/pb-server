import { Injectable } from '@nestjs/common';
import { Keyword } from './entities';
import { CreateKeywordDto, UpdateKeywordDto } from './dtos';
import { EntityManager } from 'typeorm';

@Injectable()
export class KeywordService {
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

  async deleteKeywords(keywords: Keyword[], transactionManager: EntityManager): Promise<void> {
    if (keywords.length === 0) {
      return null;
    }

    await transactionManager.delete(Keyword, keywords);
    // Promise.all([test, transactionManager.delete(Keyword, keywords)]);
  }
}
