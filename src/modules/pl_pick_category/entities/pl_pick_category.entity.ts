import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsNotEmpty } from 'class-validator';
import { PlacePlPickCategoryPivot } from './place_pl_pick_category_pivot.entity';

@Entity()
export class PlPickCategory extends BaseEntityIncrement {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  picker_color: string;

  @Column()
  memo: string;

  @Column()
  link: string;

  @OneToMany(() => PlacePlPickCategoryPivot, (pivot) => pivot.plPickCategory)
  placePlPickCategoryPivots: PlacePlPickCategoryPivot[];
}
