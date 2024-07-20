import { BuilderCommon } from './builder';
import { PlaceCategory } from '../modules/place/entities/place_category.entity';

export class PlaceCategoryBuilder extends BuilderCommon<PlaceCategory> {
  constructor() {
    super(PlaceCategory);
  }
  setPlaceCategoryName(place_category_name: string): PlaceCategoryBuilder {
    this.object.place_category_name = place_category_name;
    return this;
  }
  setPlaceCategoryNameDetail(place_category_name_detail: string): PlaceCategoryBuilder {
    this.object.place_category_name_detail = place_category_name_detail;
    return this;
  }
}
