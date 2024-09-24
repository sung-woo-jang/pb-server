import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CodeType } from '../entities/code-type.entity';

@Injectable()
export class CodeTypeRepository extends Repository<CodeType> {
  constructor(private dataSource: DataSource) {
    super(CodeType, dataSource.createEntityManager());
  }
}
