import { BuilderCommon } from './builder';
import { Image } from '../modules/post/entities/image.entity';

export class ImageBuilder extends BuilderCommon<Image> {
  constructor() {
    super(Image);
  }

  setImagePath(path: string): ImageBuilder {
    this.object.image_path = path;
    return this;
  }
}
