import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PlPickCategory } from './entities/pl_pick_category.entity';
import { UpdatePlPickCategoryDto } from './dto/request/update-pl_pick_category.dto';
import { User } from '../user/entities';

@Injectable()
export class PlPickCategoryRepository extends Repository<PlPickCategory> {
  constructor(private dataSource: DataSource) {
    super(PlPickCategory, dataSource.createEntityManager());
  }
  async updatePlPickCategory(updatePlPickCategoryDto: UpdatePlPickCategoryDto) {
    const { id, ...rest } = updatePlPickCategoryDto;
    return await this.createQueryBuilder().update().set(rest).where('id = :id', { id }).execute();
  }
  async findUserCategories(user: User) {
    return await this.createQueryBuilder('plPickCategory')
      .leftJoinAndSelect('plPickCategory.placePicks', 'placePick')
      .where('plPickCategory.user = :userId', { userId: user.id })
      .getMany();
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
      .leftJoinAndSelect('plPickCategory.placePicks', 'placePick')
      .where('plPickCategory.id = :id', { id })
      .getOne();
  }
}
