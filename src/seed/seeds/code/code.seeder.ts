import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Code } from '../../../modules/code/entities/code.entity';
import { CodeType } from '../../../modules/code/entities/code-type.entity';

const codeData = {
  스타일: [
    { code: 'STYLE_TRENDY', label: '트렌디해요' },
    { code: 'STYLE_COZY', label: '아늑해요' },
    { code: 'STYLE_ROMANTIC', label: '로맨틱해요' },
    { code: 'STYLE_MODERN', label: '모던해요' },
  ],
  '시설/서비스': [
    { code: 'SERVICE_KIND', label: '친절해요' },
    { code: 'SERVICE_FAST', label: '서비스가 빨라요' },
    { code: 'FACILITY_CLEAN', label: '깨끗해요' },
    { code: 'FACILITY_COMFORTABLE', label: '편안해요' },
  ],
  '가격/기타': [
    { code: 'PRICE_REASONABLE', label: '가격이 합리적이에요' },
    { code: 'PRICE_WORTHY', label: '가성비가 좋아요' },
    { code: 'ETC_TASTY', label: '맛있어요' },
    { code: 'ETC_PHOTOGENIC', label: '사진이 잘 나와요' },
  ],
};

export default class CodeSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const codeRepository = dataSource.getRepository(Code);
    const codeTypeRepository = dataSource.getRepository(CodeType);

    for (const [typeName, codes] of Object.entries(codeData)) {
      const codeType = await codeTypeRepository.findOne({ where: { typeName } });
      if (!codeType) {
        console.log(`CodeType "${typeName}" not found. Please run CodeTypeSeeder first.`);
        continue;
      }

      for (const { code, label } of codes) {
        const existingCode = await codeRepository.findOne({ where: { code } });
        if (!existingCode) {
          const newCode = await factoryManager.get(Code).make({ code, label });
          newCode.codeType = codeType;
          await codeRepository.save(newCode);
        }
      }
    }
  }
}
