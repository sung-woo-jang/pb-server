import { Image } from '../../../modules/post/entities/image.entity';
import { ImageBuilder } from '../../../builder/Image.builder';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';

const ImageFactory = localeKoSetSeederFactory(Image, (faker) =>
  new ImageBuilder().setImagePath(faker.image.url()).build()
);
export default ImageFactory;
