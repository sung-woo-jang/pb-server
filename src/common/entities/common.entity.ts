import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class CommonEntity<T> extends BaseEntity {
  @ApiProperty({
    example: 1,
    description: 'id',
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Index({ unique: true })
  @PrimaryGeneratedColumn('increment')
  id: number;

  // 해당 열이 추가된 시각을 자동으로 기록
  // 만일 Postgres의 time zone이 'UTC'라면 UTC 기준으로 출력하고 'Asia/Seoul'라면 서울 기준으로 출력한다.
  // DB SQL QUERY : set time zone 'Asia/Seoul'; set time zone 'UTC'; show timezone;
  @ApiProperty({
    example: '2022-07-13T04:22:24.489Z',
    description: '생성일',
    required: false,
  })
  @CreateDateColumn({
    type: 'timestamptz' /* timestamp with time zone */,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-07-13T04:22:24.489Z',
    description: '수정일',
    required: false,
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty({
    example: '2022-07-13T04:22:24.489Z',
    description: '삭제일',
    required: false,
  })
  // Soft Delete : 기존에는 null, 삭제시에 timestamp를 찍는다.
  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date | null;

  constructor(item: Partial<T>) {
    super();
    Object.assign(this, item);
  }
}
