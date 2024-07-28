import { BuilderCommon } from './builder';
import { PlacePick } from '../modules/place_pick/entities/place_pick.entity';

export class PlacePickBuilder extends BuilderCommon<PlacePick> {
  constructor() {
    super(PlacePick);
  }
  setPlPickCategoryId(id: number): PlacePickBuilder {
    this.object.pl_pick_category_id = id;
    return this;
  }
  setPlaceId(id: number): PlacePickBuilder {
    this.object.place_id = id;
    return this;
  }
  setMemo(memo: string): PlacePickBuilder {
    this.object.memo = memo;
    return this;
  }

  setAlias(alias: string): PlacePickBuilder {
    this.object.alias = alias;
    return this;
  }
  setLink(link: string): PlacePickBuilder {
    this.object.link = link;
    return this;
  }
}
