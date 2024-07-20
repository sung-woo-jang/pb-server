import { PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsPositive, IsString, IsUUID } from 'class-validator';

export abstract class BaseEntityIncrement extends TimestampEntity {
  @ApiProperty({
    example: '152',
    description: 'ID',
  })
  @IsInt()
  @IsPositive()
  @Expose()
  @PrimaryGeneratedColumn('increment')
  id: number;
}

export abstract class BaseEntityIncrementNoTimestamp {
  @ApiProperty({
    example: '152',
    description: 'ID',
  })
  @IsInt()
  @IsPositive()
  @Expose()
  @PrimaryGeneratedColumn('increment')
  id: number;
}

export abstract class BaseEntityVarchar extends TimestampEntity {
  @ApiProperty({
    example: 'i_lh7S67bW5tD5_asQdJB6AFrRTcvb4c9ew5iHzsvDw',
    description: '사용자 ID - OAuth Id 사용',
  })
  @IsString()
  @Expose()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string; // Oauth id
}

export abstract class BaseEntityUUID extends TimestampEntity {
  @ApiProperty({
    example: 'i_lh7S67bW5tD5_asQdJB6AFrRTcvb4c9ew5iHzsvDw',
    description: '테이블 ID값으로 사용',
  })
  @IsUUID()
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string; // Oauth id
}
