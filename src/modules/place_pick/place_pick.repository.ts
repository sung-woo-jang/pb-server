import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { PlacePick } from './entities/place_pick.entity';
import { User } from '../user/entities';
import { DeletePlacePickRequestDto } from './dto/request/delete-place_pick-request.dto';

@Injectable()
export class PlacePickRepository extends Repository<PlacePick> {
  constructor(private dataSource: DataSource) {
    super(PlacePick, dataSource.createEntityManager());
  }
  async findPlacePickList(id: number) {
    return await this.createQueryBuilder('placePick')
      .select(['placePick.place_id', 'placePick.memo', 'placePick.link', 'placePick.alias', 'placePick.createdAt'])
      .leftJoin('placePick.place', 'place')
      .addSelect([
        'place.title',
        'place.address',
        'place.road_address',
        'place.description',
        'place.telephone',
        'place.mapx',
        'place.mapy',
      ])
      .leftJoin('placePick.plPickCategory', 'plPickCategory')
      .addSelect(['plPickCategory.id', 'plPickCategory.title', 'plPickCategory.memo'])
      .leftJoinAndSelect('place.placeCategory', 'placeCategory')
      .addSelect(['placeCategory.place_category_name', 'placeCategory.place_category_name_detail'])
      .where('plPickCategory.id = :id', { id })
      .orderBy('placePick.createdAt', 'ASC')
      .getMany();
  }

  async createPlacePick(placePick: PlacePick, transactionManager: EntityManager) {
    return await transactionManager.getRepository(PlacePick).save(placePick);
  }

  async countPlacePicksByPlaceIds(placeIds: number[]): Promise<{ place_id: number; count: string }[]> {
    return await this.createQueryBuilder('placePick')
      .select('placePick.place_id', 'place_id')
      .addSelect('COUNT(placePick.place_id)', 'count')
      .groupBy('placePick.place_id')
      .where('placePick.place_id IN (:...placeIds)', { placeIds })
      .getRawMany();
  }

  async getAllMyPlacePick(user: User) {
    return await this.createQueryBuilder('placePick')
      .distinctOn(['place.id'])
      .select(['place.id', 'placePick.place_id', 'place.mapy', 'place.mapx'])
      .leftJoin('placePick.plPickCategory', 'plPickCategory')
      .addSelect(['plPickCategory.picker_color'])
      .leftJoin('placePick.place', 'place')
      .where('plPickCategory.account = :id', { id: user.id })
      .getMany();
  }

  async deletePlacePick({ place_id, pl_pick_category_id }: DeletePlacePickRequestDto) {
    return await this.createQueryBuilder()
      .delete()
      .where('place_id = :place_id', { place_id })
      .andWhere('pl_pick_category_id = :pl_pick_category_id', { pl_pick_category_id })
      .execute();
  }
}
