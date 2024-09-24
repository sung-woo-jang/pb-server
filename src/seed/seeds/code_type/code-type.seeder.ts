import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CodeType } from '../../../modules/code/entities/code-type.entity';
import { CodeCategory } from '../../../modules/code/entities/code-category.entity';

export default class CodeTypeSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const codeTypeRepository = dataSource.getRepository(CodeType);
    const codeCategoryRepository = dataSource.getRepository(CodeCategory);

    const codeCategory = await codeCategoryRepository.findOne({ where: { ctcName: '리뷰 키워드' } });
    if (!codeCategory) {
      console.log('CodeCategory "리뷰 키워드" not found. Please run CodeCategorySeeder first.');
      return;
    }

    const codeTypes = ['스타일', '시설/서비스', '가격/기타'];
    for (const typeName of codeTypes) {
      const existingType = await codeTypeRepository.findOne({ where: { typeName } });
      if (!existingType) {
        const codeType = await factoryManager.get(CodeType).make({ typeName });
        codeType.codeCategory = codeCategory;
        await codeTypeRepository.save(codeType);
      }
    }
  }
}
