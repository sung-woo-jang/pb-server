import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Code } from '../entities/code.entity';

@Injectable()
export class CodeRepository extends Repository<Code> {
  constructor(private dataSource: DataSource) {
    super(Code, dataSource.createEntityManager());
  }
}
