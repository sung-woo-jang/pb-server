import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Place } from '../../../modules/place/entities/place.entity';
import { PlPickCategory } from '../../../modules/pl_pick_category/entities/pl_pick_category.entity';
import { PlacePick } from '../../../modules/place_pick/entities/place_pick.entity';

export default class PlacePickSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const placeRepository = dataSource.getRepository(Place);
    const plPickCategoryRepository = dataSource.getRepository(PlPickCategory);
    const placePickRepository = dataSource.getRepository(PlacePick);

    const places = await placeRepository.find();
    const plPickCategories = await plPickCategoryRepository.find();

    const minPicksPerPlace = 1;
    const maxPicksPerPlace = Math.min(5, plPickCategories.length);

    for (const place of places) {
      // 각 Place에 대해 랜덤한 수의 PlacePick을 생성
      const numberOfPicks = Math.floor(Math.random() * (maxPicksPerPlace - minPicksPerPlace + 1)) + minPicksPerPlace;

      // PlPickCategory 배열을 섞어서 랜덤한 순서로 만듦
      const shuffledCategories = plPickCategories.sort(() => 0.5 - Math.random());

      for (let i = 0; i < numberOfPicks; i++) {
        const placePick = await factoryManager.get(PlacePick).make({
          place,
          plPickCategory: shuffledCategories[i],
        });
        await placePickRepository.save(placePick);
      }
    }
  }
}
