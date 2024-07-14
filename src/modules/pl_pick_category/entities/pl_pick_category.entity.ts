import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsNotEmpty } from 'class-validator';
import { PlacePlPickCategoryPivot } from './place_pl_pick_category_pivot.entity';
import { User } from '../../user/entities';

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

  @ManyToOne(() => User, (user) => user.plPickCategories)
  @JoinColumn({ name: 'account' })
  user: User;
}
