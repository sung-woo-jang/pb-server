import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CodeType } from '../../../modules/code/entities/code-type.entity';
import { CodeCategory } from '../../../modules/code/entities/code-category.entity';

export default class CodeTypeSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const codeTypeRepository = dataSource.getRepository(CodeType);
    const codeCategoryRepository = dataSource.getRepository(CodeCategory);
    const codeTypeFactory = factoryManager.get(CodeType);

    const category = await codeCategoryRepository.findOne({ where: { ctcCd: 'KEYWORD' } });
    if (!category) {
      console.log('CodeCategory not found. Please run CodeCategorySeeder first.');
      return;
    }

    const codeTypes = ['AMBIENCE', 'PRICE', 'SERVICE', 'FOOD_QUALITY', 'CLEANLINESS'];

    for (const typeId of codeTypes) {
      const existingType = await codeTypeRepository.findOne({ where: { typeId } });
      if (!existingType) {
        const codeType = await codeTypeFactory.make();
        codeType.codeCategory = category;
        await codeTypeRepository.save(codeType);
      }
    }
  }
}
