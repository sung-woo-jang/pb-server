import { BaseEntityIncrement } from '@common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Image extends BaseEntityIncrement {
  @Column()
  @ApiProperty()
  image_path: string;

  @ManyToOne(() => Post, (post) => post.image)
  post: Post;
}
