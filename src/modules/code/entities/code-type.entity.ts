import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CodeCategory } from './code-category.entity';
import { Code } from './code.entity';
import { UseYn } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { TimestampEntity } from '@common/entities/timestamp.entity';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@Entity()
export class CodeType extends TimestampEntity {
  @ApiProperty({
    description: '코드 유형의 고유 식별자',
    example: 'USER_ROLE',
  })
  @PrimaryColumn('varchar', { length: 30 })
  @IsNotEmpty({ message: '코드 유형 ID는 필수입니다.' })
  @IsString({ message: '코드 유형 ID는 문자열이어야 합니다.' })
  @MaxLength(30, { message: '코드 유형 ID는 30자를 초과할 수 없습니다.' })
  @Expose()
  typeId: string;

  @ApiProperty({ description: '코드 유형의 이름', example: '사용자 역할' })
  @Column({ length: 100 })
  @Expose()
  typeName: string;

  @ApiProperty({ description: '정렬 순서', example: 1, default: 1 })
  @Column({ default: 1 })
  @Expose()
  sortOrder: number;

  @ApiProperty({ description: '사용 여부', enum: UseYn, default: UseYn.YES })
  @Column({ type: 'enum', enum: UseYn, default: UseYn.YES })
  @Expose()
  useYn: UseYn;

  @ApiProperty({ type: () => CodeCategory, description: '이 코드 유형이 속한 코드 카테고리' })
  @ManyToOne(() => CodeCategory, (codeCategory) => codeCategory.codeTypes)
  @JoinColumn({ name: 'ctcCd' })
  @Expose()
  codeCategory: CodeCategory;

  @ApiProperty({ type: () => [Code], description: '이 코드 유형에 속한 코드 목록' })
  @OneToMany(() => Code, (code) => code.codeType)
  @Expose()
  codes: Code[];
}
