import { PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

export abstract class BaseEntityIncrement extends TimestampEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
}

export abstract class BaseEntityVarchar extends TimestampEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string; // Oauth id
}
