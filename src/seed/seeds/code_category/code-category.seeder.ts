import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CodeCategory } from '../../../modules/code/entities/code-category.entity';

export default class CodeCategorySeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const codeCategoryRepository = dataSource.getRepository(CodeCategory);

    const existingCategory = await codeCategoryRepository.findOne({ where: { ctcName: '리뷰 키워드' } });
    if (!existingCategory) {
      const codeCategory = await factoryManager.get(CodeCategory).make();
      await codeCategoryRepository.save(codeCategory);
    }
  }
}
