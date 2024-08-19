import { DataSource, Repository } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Place } from '../../../modules/place/entities/place.entity';
import { PlaceCategory } from '../../../modules/place/entities/place_category.entity';
import data from '../dummy_map';

export default class PlaceSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const placeRepository: Repository<Place> = dataSource.getRepository(Place);
    const placeCategoryRepository: Repository<PlaceCategory> = dataSource.getRepository(PlaceCategory);

    // 1. PlaceCategory 처리
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
      let category = await placeCategoryRepository.findOne({
        where: {
          place_category_name: categoryData.place_category_name,
          place_category_name_detail: categoryData.place_category_name_detail,
        },
      });

      if (!category) {
        category = await factoryManager.get(PlaceCategory).make(categoryData);
        await placeCategoryRepository.save(category);
      }
    }

    // 2. Place 처리
    const existingPlaces = await placeRepository.find({
      select: ['title', 'road_address'],
    });

    const existingSet = new Set(existingPlaces.map((p) => `${p.title}|${p.road_address}`));

    const newPlaces = [];
    for (const placeData of data) {
      const key = `${placeData.title}|${placeData.roadAddress}`;
      if (!existingSet.has(key)) {
        const category = await placeCategoryRepository.findOne({
          where: {
            place_category_name: placeData.place_category_name,
            place_category_name_detail: placeData.place_category_name_detail,
          },
        });

        if (category) {
          const place = await factoryManager.get(Place).make({ ...placeData, placeCategory: category });
          newPlaces.push(place);
          existingSet.add(key);
        }
      }
    }

    // 벌크 삽입 수행
    if (newPlaces.length > 0) {
      await placeRepository.createQueryBuilder().insert().into(Place).values(newPlaces).orIgnore().execute();
    }
  }
}
