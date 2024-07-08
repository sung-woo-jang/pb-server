import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntityUUID } from '../../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { Code } from './code.entity';
import { UseYn } from '../enums';

@Entity()
export class GroupCode extends BaseEntityUUID {
  @ApiProperty({ example: '2', description: '공통코드에 정의된 키워드 value' })
  @Column({ unique: true })
  @IsString()
  @Expose()
  code: string;

  @ApiProperty({ example: '2', description: '공통코드에 정의된 키워드 value' })
  @Column()
  @IsString()
  @Expose()
  description: string;

  @ApiProperty({ example: 'Y', description: '공통코드에 정의된 키워드 value' })
  @Column({ type: 'enum', enum: UseYn, default: UseYn.YES })
  @IsEnum(UseYn)
  @Expose()
  useYn: UseYn;

  @OneToMany(() => Code, (code) => code.groupCode)
  values: Code[];
}
