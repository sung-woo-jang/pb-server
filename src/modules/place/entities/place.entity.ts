import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsInt, IsString } from 'class-validator';
import { PlacePlPickCategoryPivot } from '../../pl_pick_category/entities/place_pl_pick_category_pivot.entity';
import { PlaceCategory } from './place_category.entity';

@Entity()
export class Place extends BaseEntityIncrement {
  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  road_address: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  telephone: string;

  @Column()
  @IsInt()
  mapx: number;

  @Column()
  @IsInt()
  mapy: number;

  @ManyToOne(() => PlaceCategory, (placeCategory) => placeCategory.places)
  placeCategory: PlaceCategory;

  @OneToMany(() => PlacePlPickCategoryPivot, (pivot) => pivot.place)
  placePlPickCategoryPivots: PlacePlPickCategoryPivot[];
}
