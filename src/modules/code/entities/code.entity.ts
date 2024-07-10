import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntityUUID } from '@common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsPositive, IsString } from 'class-validator';
import { GroupCode } from './group-code.entity';
import { UseYn } from '@common/enums';

@Entity()
export class Code extends BaseEntityUUID {
  @ApiProperty({ example: '2', description: '공통코드에 정의된 키워드 value' })
  @Column()
  @IsString()
  @Expose()
  value: string;

  @ApiProperty({ example: '2', description: '공통코드에 정의된 키워드 value' })
  @Column()
  @IsString()
  @Expose()
  label: string;

  @ApiProperty({ example: 'Y', description: '공통코드에 정의된 키워드 value' })
  @Column({ type: 'enum', enum: UseYn, default: UseYn.YES })
  @IsEnum(UseYn)
  @Expose()
  useYn: UseYn;

  @ApiProperty({ example: 2, description: '공통코드에 정의된 키워드 value' })
  @Column()
  @IsInt()
  @IsPositive()
  @Expose()
  sort: number;

  @ManyToOne(() => GroupCode, (groupCode) => groupCode.values, { cascade: ['remove', 'soft-remove'] })
  groupCode: GroupCode;
}
