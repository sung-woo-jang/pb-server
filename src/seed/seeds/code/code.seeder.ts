import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Code } from '../../../modules/code/entities/code.entity';
import { CodeType } from '../../../modules/code/entities/code-type.entity';

const codeValues = {
  AMBIENCE: ['로맨틱한', '조용한', '활기찬', '고급스러운', '편안한'],
  PRICE: ['저렴한', '적당한', '비싼', '가성비 좋은', '고급'],
  SERVICE: ['친절한', '빠른', '전문적인', '불친절한', '느린'],
  FOOD_QUALITY: ['맛있는', '신선한', '창의적인', '평범한', '맛없는'],
  CLEANLINESS: ['깨끗한', '정돈된', '지저분한', '청결한', '개선 필요한'],
};

export default class CodeSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const codeRepository = dataSource.getRepository(Code);
    const codeTypeRepository = dataSource.getRepository(CodeType);
    const codeFactory = factoryManager.get(Code);

    for (const [typeId, values] of Object.entries(codeValues)) {
      const codeType = await codeTypeRepository.findOne({ where: { typeId } });
      if (!codeType) {
        console.log(`CodeType ${typeId} not found. Please run CodeTypeSeeder first.`);
        continue;
      }

      for (const label of values) {
        const code = label.toUpperCase().replace(/\s+/g, '_');
        const existingCode = await codeRepository.findOne({ where: { code } });
        if (!existingCode) {
          const newCode = await codeFactory.make({ code, label, codeType });

          await codeRepository.save(newCode);
        }
      }
    }
  }
}
