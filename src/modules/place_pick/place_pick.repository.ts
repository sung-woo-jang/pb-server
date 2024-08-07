import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { PlacePick } from './entities/place_pick.entity';

@Injectable()
export class PlacePickRepository extends Repository<PlacePick> {
  constructor(private dataSource: DataSource) {
    super(PlacePick, dataSource.createEntityManager());
  }
  async findPlacePickList(id: number) {
    return await this.createQueryBuilder('placePick')
      .leftJoinAndSelect('placePick.place', 'place')
      .leftJoinAndSelect('placePick.plPickCategory', 'plPickCategory')
      .leftJoinAndSelect('place.placeCategory', 'placeCategory')
      .where('plPickCategory.id = :id', { id })
      .getMany();
  }

  async createPlacePick(placePick: PlacePick, transactionManager: EntityManager) {
    return await transactionManager.getRepository(PlacePick).save(placePick);
  }
}
