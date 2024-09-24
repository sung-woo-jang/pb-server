import { Injectable } from '@nestjs/common';
import { CodeRepository } from './repository/code.repository';
import { CodeTypeRepository } from './repository/code-type.repository';
import { CodeCategoryRepository } from './repository/code-category.repository';

@Injectable()
export class CodeService {
  constructor(
    private readonly codeRepository: CodeRepository,
    private readonly codeTypeRepository: CodeTypeRepository,
    private readonly codeCategoryRepository: CodeCategoryRepository
  ) {}

  async getAllCodes() {
    return await this.codeCategoryRepository.findAllWithRelations();
  }
}
