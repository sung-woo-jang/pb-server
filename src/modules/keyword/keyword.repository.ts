import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Keyword } from './entities';

@Injectable()
export class KeywordRepository extends Repository<Keyword> {
  constructor(private dataSource: DataSource) {
    super(Keyword, dataSource.createEntityManager());
  }
}
