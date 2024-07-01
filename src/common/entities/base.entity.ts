import { PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export abstract class BaseEntityIncrement extends TimestampEntity {
  @ApiProperty({
    example: 'i_lh7S67bW5tD5_asQdJB6AFrRTcvb4c9ew5iHzsvDw',
    description: '사용자 ID',
  })
  @Expose()
  @PrimaryGeneratedColumn('increment')
  id: number;
}

export abstract class BaseEntityVarchar extends TimestampEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string; // Oauth id
}
