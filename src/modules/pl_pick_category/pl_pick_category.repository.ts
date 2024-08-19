import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PlPickCategory } from './entities/pl_pick_category.entity';
import { UpdatePlPickCategoryDto } from './dto/request/update-pl_pick_category.dto';

@Injectable()
export class PlPickCategoryRepository extends Repository<PlPickCategory> {
  constructor(private dataSource: DataSource) {
    super(PlPickCategory, dataSource.createEntityManager());
  }
  async updatePlPickCategory(updatePlPickCategoryDto: UpdatePlPickCategoryDto) {
    const { id, ...rest } = updatePlPickCategoryDto;
    return await this.createQueryBuilder().update().set(rest).where('id = :id', { id }).execute();
  }
  async findUserCategories(userId: string) {
    return await this.createQueryBuilder('plPickCategory').where('plPickCategory.user = :userId', { userId }).getMany();
  }
  async findOneWithDeleted(id: number) {
    return await this.createQueryBuilder().withDeleted().where('id = :id', { id }).getOne();
  }
  async deletePlPickCategory(id: number) {
    return await this.createQueryBuilder().softDelete().where('id = :id', { id }).execute();
  }
  async restorePlPickCategory(id: number) {
    return await this.createQueryBuilder().restore().where('id = :id', { id }).execute();
  }

  async getCategoryWithPlacePicks(id: number) {
    return await this.createQueryBuilder('plPickCategory')
      .select([
        'plPickCategory.id',
        'plPickCategory.createdAt',
        'plPickCategory.title',
        'plPickCategory.picker_color',
        'plPickCategory.memo',
        'plPickCategory.link',
      ])
      .leftJoin('plPickCategory.placePicks', 'placePick')
      .addSelect([
        'placePick.place_id',
        'placePick.pl_pick_category_id',
        'placePick.createdAt',
        'placePick.memo',
        'placePick.alias',
        'placePick.link',
      ])
      .leftJoin('placePick.place', 'place')
      .addSelect(['place.id', 'place.title', 'place.address', 'place.road_address'])
      .leftJoin('place.placeCategory', 'placeCategory')
      .addSelect(['placeCategory.id', 'placeCategory.place_category_name', 'placeCategory.place_category_name_detail'])
      .where('plPickCategory.id = :id', { id })
      .getOne();
  }
}
