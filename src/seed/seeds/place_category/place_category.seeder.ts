import { DataSource, Repository } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PlaceCategory } from '../../../modules/place/entities/place_category.entity';
import data from '../dummy_map';

export default class PlaceCategorySeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const placeCategoryRepository: Repository<PlaceCategory> = dataSource.getRepository(PlaceCategory);

    // 고유한 카테고리 조합 추출
    const uniqueCategories = Array.from(
      new Set(
        data.map((item) =>
          JSON.stringify({
            place_category_name: item.place_category_name,
            place_category_name_detail: item.place_category_name_detail,
          })
        )
      )
    ).map((item) => JSON.parse(item));

    for (const categoryData of uniqueCategories) {
      const existingCategory = await placeCategoryRepository.findOne({
        where: {
          place_category_name: categoryData.place_category_name,
          place_category_name_detail: categoryData.place_category_name_detail,
        },
      });

      if (!existingCategory) {
        const category = await factoryManager.get(PlaceCategory).make(categoryData);
        await placeCategoryRepository.save(category);
      }
    }
  }
}
