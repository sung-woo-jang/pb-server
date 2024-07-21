import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Place } from './entities/place.entity';

@Injectable()
export class PlaceRepository extends Repository<Place> {
  constructor(private dataSource: DataSource) {
    super(Place, dataSource.createEntityManager());
  }
}
