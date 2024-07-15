import { BaseEntityIncrement } from '@common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Place } from '../../place/entities/place.entity';
import { PlPickCategory } from './pl_pick_category.entity';
import { IsUrl } from 'class-validator';

@Entity()
export class PlacePlPickCategoryPivot extends BaseEntityIncrement {
  @ManyToOne(() => Place, (place) => place.placePlPickCategoryPivots)
  place: Place;

  @ManyToOne(() => PlPickCategory, (plPickCategory) => plPickCategory.placePlPickCategoryPivots)
  plPickCategory: PlPickCategory;

  @Column({ nullable: true })
  memo: string;

  @Column({ nullable: true })
  alias: string;

  @Column({ nullable: true })
  @IsUrl()
  link: string;
}
