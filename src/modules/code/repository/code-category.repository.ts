import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CodeCategory } from '../entities/code-category.entity';

@Injectable()
export class CodeCategoryRepository extends Repository<CodeCategory> {
  constructor(private dataSource: DataSource) {
    super(CodeCategory, dataSource.createEntityManager());
  }

  async findAllWithRelations() {
    const codeCategoryQuery = this.createQueryBuilder('codeCategory').select([
      'codeCategory.ctcCd',
      'codeCategory.ctcName',
      'codeCategory.sortOrder',
    ]);

    const withCodeTypeQuery = codeCategoryQuery
      .leftJoin('codeCategory.codeTypes', 'codeType')
      .addSelect(['codeType.typeId', 'codeType.typeName', 'codeType.sortOrder']);

    const withCodeQuery = withCodeTypeQuery
      .leftJoin('codeType.codes', 'code')
      .addSelect(['code.codeId', 'code.code', 'code.upperCode', 'code.label', 'code.sortOrder']);

    const orderedQuery = withCodeQuery
      .orderBy('codeCategory.sortOrder', 'ASC')
      .addOrderBy('codeType.sortOrder', 'ASC')
      .addOrderBy('code.sortOrder', 'ASC');

    return await orderedQuery.getMany();
  }
}
