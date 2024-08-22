import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Place } from '../entities/place.entity';

@Injectable()
export class PlaceRepository extends Repository<Place> {
  constructor(private dataSource: DataSource) {
    super(Place, dataSource.createEntityManager());
  }
  async createPlace(place: Place, transactionManager: EntityManager) {
    return await transactionManager.save(Place, { ...place });
  }

  async searchPlaces() {
    return await this.createQueryBuilder('place')
      .leftJoin('place.placeCategory', 'placeCategory')
      .addSelect(['placeCategory.place_category_name', 'placeCategory.place_category_name_detail'])
      .getMany();
  }
}
