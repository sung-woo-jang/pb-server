import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { CodeRepository } from './repository/code.repository';
import { CodeTypeRepository } from './repository/code-type.repository';
import { CodeCategoryRepository } from './repository/code-category.repository';

@Module({
  controllers: [CodeController],
  providers: [CodeService, CodeRepository, CodeTypeRepository, CodeCategoryRepository],
  exports: [CodeService, CodeRepository, CodeTypeRepository, CodeCategoryRepository],
})
export class CodeModule {}
