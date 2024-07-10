import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntityIncrementNoTimestamp } from '@common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Post } from '../../post/entities';

@Entity()
export class Keyword extends BaseEntityIncrementNoTimestamp {
  @ApiProperty({ example: '2', description: '공통코드에 정의된 키워드 value' })
  @Column({ type: 'varchar', length: 2 })
  @IsString()
  @Expose()
  keyword: string;

  @ManyToOne(() => Post, (post) => post.keywords, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post: Post;
}
