import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsInt, IsString } from 'class-validator';
import { PlacePlPickCategoryPivot } from '../../pl_pick_category/entities/place_pl_pick_category_pivot.entity';
import { PlaceCategory } from './place_category.entity';
import { Post } from '../../post/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Place extends BaseEntityIncrement {
  @ApiProperty()
  @Column()
  @IsString()
  title: string;

  @ApiProperty()
  @Column()
  @IsString()
  address: string;

  @ApiProperty()
  @Column()
  @IsString()
  road_address: string;

  @ApiProperty()
  @Column()
  @IsString()
  description: string;

  @ApiProperty()
  @Column()
  @IsString()
  telephone: string;

  @ApiProperty()
  @Column({ type: 'double precision', comment: '126.654075' })
  @IsInt()
  mapx: number;

  @ApiProperty()
  @Column({ type: 'double precision', comment: '37.4665220' })
  @IsInt()
  mapy: number;

  @ManyToOne(() => PlaceCategory, (placeCategory) => placeCategory.places)
  placeCategory: PlaceCategory;

  @OneToMany(() => PlacePlPickCategoryPivot, (pivot) => pivot.place)
  placePlPickCategoryPivots: PlacePlPickCategoryPivot[];

  @OneToMany(() => Post, (post) => post.place)
  post: Post[];
}
