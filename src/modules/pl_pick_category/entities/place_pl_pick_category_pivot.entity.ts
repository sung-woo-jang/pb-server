import { BaseEntityIncrement } from '@common/entities/base.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Place } from '../../place/entities/place.entity';
import { PlPickCategory } from './pl_pick_category.entity';

@Entity()
export class PlacePlPickCategoryPivot extends BaseEntityIncrement {
  @ManyToOne(() => Place, (place) => place.placePlPickCategoryPivots)
  place: Place;

  @ManyToOne(() => PlPickCategory, (plPickCategory) => plPickCategory.placePlPickCategoryPivots)
  plPickCategory: PlPickCategory;
}
