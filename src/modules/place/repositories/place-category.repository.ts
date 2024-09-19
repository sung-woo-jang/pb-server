import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { PlaceCategory } from '../entities/place_category.entity';

@Injectable()
export class PlaceCategoryRepository extends Repository<PlaceCategory> {
  constructor(private dataSource: DataSource) {
    super(PlaceCategory, dataSource.createEntityManager());
  }
  async createPlaceCategory(place: PlaceCategory, transactionManager: EntityManager) {
    return await transactionManager
      .createQueryBuilder()
      .insert()
      .into(PlaceCategory)
      .values(place)
      .orUpdate(
        [
          'place_category_name_disassembled',
          'place_category_name_choseong',
          'place_category_name_detail_disassembled',
          'place_category_name_detail_choseong',
        ],
        ['place_category_name', 'place_category_name_detail']
      )
      .execute();
  }
}
