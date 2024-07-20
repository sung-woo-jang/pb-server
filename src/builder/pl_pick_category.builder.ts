import { BuilderCommon } from './builder';
import { CircleColors, PlPickCategory } from '../modules/pl_pick_category/entities/pl_pick_category.entity';

export class PlPickCategoryBuilder extends BuilderCommon<PlPickCategory> {
  constructor() {
    super(PlPickCategory);
  }

  setTitle(title: string): PlPickCategoryBuilder {
    this.object.title = title;
    return this;
  }
  setPickerColor(picker_color: CircleColors): PlPickCategoryBuilder {
    this.object.picker_color = picker_color;
    return this;
  }
  setMemo(memo: string): PlPickCategoryBuilder {
    this.object.memo = memo;
    return this;
  }
  setLink(link: string): PlPickCategoryBuilder {
    this.object.link = link;
    return this;
  }
}
