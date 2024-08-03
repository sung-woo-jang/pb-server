import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordRepository } from './keyword.repository';

@Module({
  providers: [KeywordService, KeywordRepository],
  exports: [KeywordService, KeywordRepository],
})
export class KeywordModule {}
