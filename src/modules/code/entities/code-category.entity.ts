import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CodeType } from './code-type.entity';
import { UseYn } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { TimestampEntity } from '@common/entities/timestamp.entity';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@Entity()
export class CodeCategory extends TimestampEntity {
  @ApiProperty({
    description: 'Common Type Code (CTC) - 공통 유형 코드의 고유 식별자',
    example: 'KEYWORD',
  })
  @PrimaryColumn('varchar', { length: 20 })
  @IsNotEmpty({ message: 'CTC 코드는 필수입니다.' })
  @IsString({ message: 'CTC 코드는 문자열이어야 합니다.' })
  @MaxLength(20, { message: 'CTC 코드는 20자를 초과할 수 없습니다.' })
  @Expose()
  ctcCd: string;

  @ApiProperty({ description: '공통 유형 코드의 이름', example: '사용자 구분' })
  @Column({ length: 100 })
  @Expose()
  ctcName: string;

  @ApiProperty({ description: '정렬 순서', example: 1, default: 1 })
  @Column({ default: 1 })
  @Expose()
  sortOrder: number;

  @ApiProperty({ description: '사용 여부', enum: UseYn, default: UseYn.YES })
  @Column({ type: 'enum', enum: UseYn, default: UseYn.YES })
  @Expose()
  useYn: UseYn;

  @ApiProperty({ type: () => [CodeType], description: '이 카테고리에 속한 코드 유형 목록' })
  @OneToMany(() => CodeType, (codeType) => codeType.codeCategory)
  @Expose()
  codeTypes: CodeType[];
}
