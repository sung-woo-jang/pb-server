import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Place } from '../../../modules/place/entities/place.entity';
import { PlPickCategory } from '../../../modules/pl_pick_category/entities/pl_pick_category.entity';
import { PlacePick } from '../../../modules/place_pick/entities/place_pick.entity';

export default class PlacePickSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const places = await dataSource.getRepository(Place).createQueryBuilder().limit(10).getMany();
    const plPickCategories = await dataSource.getRepository(PlPickCategory).createQueryBuilder().limit(10).getMany();

    // const placePickRepository = dataSource.getRepository(PlacePick);

    for (const place of places) {
      for (const plPickCategory of plPickCategories) {
        await factoryManager.get(PlacePick).save({ place, plPickCategory });
      }
    }

    // 기존 엔트리들을 미리 가져와서 맵으로 만듭니다.
    // const existingEntries = await placePickRepository.find();
    // const existingEntryMap = new Map<string, boolean>();
    // existingEntries.forEach((entry) => {
    //   const key = `${entry.place_id}-${entry.pl_pick_category_id}`;
    //   existingEntryMap.set(key, true);
    // });
    //
    // for (const place of places) {
    //   for (const plPickCategory of plPickCategories) {
    //     const key = `${place.id}-${plPickCategory.id}`;
    //     if (!existingEntryMap.has(key)) {
    //       await factoryManager.get(PlacePick).save({
    //         place,
    //         plPickCategory,
    //       });
    //       existingEntryMap.set(key, true);
    //     }
    //   }
    // }
  }
}
