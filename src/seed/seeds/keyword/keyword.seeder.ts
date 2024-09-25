import { DataSource, Repository } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Keyword } from '../../../modules/keyword/entities';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';
import { Post } from '../../../modules/post/entities';
import { Code } from '../../../modules/code/entities/code.entity';

export default class KeywordSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const postRepository: Repository<Post> = dataSource.getRepository(Post);
    const keywordRepository: Repository<Keyword> = dataSource.getRepository(Keyword);
    const codeRepository: Repository<Code> = dataSource.getRepository(Code);

    const posts = await postRepository.find();

    const codes = await codeRepository
      .createQueryBuilder('code')
      .innerJoin('code.codeType', 'codeType')
      .innerJoin('codeType.codeCategory', 'codeCategory')
      .where('codeCategory.ctcCd = :category', { category: 'KEYWORD' })
      .getMany();

    if (codes.length === 0) {
      throw new Error('No keyword codes found. Please run CodeSeeder first.');
    }

    for (const post of posts) {
      const keywordCount = generateRandomInteger(2);
      const selectedCodes = this.getRandomCodes(codes, keywordCount);

      for (const code of selectedCodes) {
        const keyword = new Keyword();
        keyword.keyword = code.codeId;
        keyword.post = post;
        await keywordRepository.save(keyword);
      }
    }
  }

  private getRandomCodes(codes: Code[], count: number): Code[] {
    const shuffled = codes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
