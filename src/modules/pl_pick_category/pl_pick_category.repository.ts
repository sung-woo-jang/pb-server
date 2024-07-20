import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PlPickCategory } from './entities/pl_pick_category.entity';

@Injectable()
export class PlPickCategoryRepository extends Repository<PlPickCategory> {
  constructor(private dataSource: DataSource) {
    super(PlPickCategory, dataSource.createEntityManager());
  }
}
