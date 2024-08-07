import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { PlaceCategory } from '../entities/place_category.entity';

@Injectable()
export class PlaceCategoryRepository extends Repository<PlaceCategory> {
  constructor(private dataSource: DataSource) {
    super(PlaceCategory, dataSource.createEntityManager());
  }
  async createPlaceCategory(place: PlaceCategory, transactionManager: EntityManager) {
    return await transactionManager.getRepository(PlaceCategory).save(place);
  }
}
