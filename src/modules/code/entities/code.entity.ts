import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CodeType } from './code-type.entity';
import { UseYn } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { TimestampEntity } from '@common/entities/timestamp.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Code extends TimestampEntity {
  @ApiProperty({ description: '코드의 고유 식별자', example: 'uuid' })
  @PrimaryGeneratedColumn('uuid', {})
  @Expose()
  codeId: string;

  @ApiProperty({ description: '실제 코드 값', example: 'ADMIN' })
  @Column({ length: 20 })
  @Expose()
  code: string;

  @ApiProperty({ description: '정렬 순서', example: 1, default: 1 })
  @Column({ default: 1 })
  @Expose()
  sortOrder: number;

  @ApiProperty({ description: '코드의 레이블 또는 표시 이름', example: '관리자' })
  @Column({ length: 100 })
  @Expose()
  label: string;

  @ApiProperty({ description: '사용 여부', enum: UseYn, default: UseYn.YES })
  @Column({ type: 'enum', enum: UseYn, default: UseYn.YES })
  @Expose()
  useYn: UseYn;

  @ApiProperty({ type: () => CodeType, description: '이 코드가 속한 코드 유형' })
  @ManyToOne(() => CodeType, (codeType) => codeType.codes)
  @JoinColumn({ name: 'typeId' })
  @Expose()
  codeType: CodeType;
}
