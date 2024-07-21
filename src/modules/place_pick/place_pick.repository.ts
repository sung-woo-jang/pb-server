import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PlacePlPickCategoryPivot } from './entities/place_pl_pick_category_pivot.entity';

@Injectable()
export class PlacePickRepository extends Repository<PlacePlPickCategoryPivot> {
  constructor(private dataSource: DataSource) {
    super(PlacePlPickCategoryPivot, dataSource.createEntityManager());
  }
}
