import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CodeCategory } from '../../../modules/code/entities/code-category.entity';

export default class CodeCategorySeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const codeRepository = dataSource.getRepository(CodeCategory);
    const codeFactory = factoryManager.get(CodeCategory);

    const existingCategory = await codeRepository.findOne({ where: { ctcCd: 'KEYWORD' } });
    if (!existingCategory) {
      const category = await codeFactory.make();
      await codeRepository.save(category);
    }
  }
}
