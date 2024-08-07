import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimestampEntity {
  @ApiProperty({
    example: '2024-07-03T16:49:20.878Z',
    description: '생성일',
  })
  @IsDate()
  @Expose()
  @CreateDateColumn({ type: 'timestamptz', precision: 6 })
  createdAt: Date;

  @ApiProperty({
    example: '2024-07-03T16:49:20.878Z',
    description: '수정일',
  })
  @IsDate()
  @Expose()
  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 6 })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-07-03T16:49:20.878Z',
    description: '삭제일',
  })
  @IsDate()
  @IsOptional()
  @Expose()
  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz', precision: 6 })
  deletedAt: Date | null;
}
