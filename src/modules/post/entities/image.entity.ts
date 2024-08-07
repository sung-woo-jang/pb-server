import { BaseEntityIncrement } from '@common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity()
export class Image extends BaseEntityIncrement {
  @Column()
  @Expose()
  @ApiProperty()
  image_path: string;

  @ManyToOne(() => Post, (post) => post.images)
  post: Post;
}
