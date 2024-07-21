import { BuilderCommon } from './builder';
import { PlacePlPickCategoryPivot } from '../modules/place_pick/entities/place_pl_pick_category_pivot.entity';

export class PlacePlPickCategoryPivotBuilder extends BuilderCommon<PlacePlPickCategoryPivot> {
  constructor() {
    super(PlacePlPickCategoryPivot);
  }
  setPlPickCategoryId(id: number): PlacePlPickCategoryPivotBuilder {
    this.object.pl_pick_category_id = id;
    return this;
  }
  setPlaceId(id: number): PlacePlPickCategoryPivotBuilder {
    this.object.place_id = id;
    return this;
  }
  setMemo(memo: string): PlacePlPickCategoryPivotBuilder {
    this.object.memo = memo;
    return this;
  }

  setAlias(alias: string): PlacePlPickCategoryPivotBuilder {
    this.object.alias = alias;
    return this;
  }
  setLink(link: string): PlacePlPickCategoryPivotBuilder {
    this.object.link = link;
    return this;
  }
}
