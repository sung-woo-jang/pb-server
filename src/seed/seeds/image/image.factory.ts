import { Image } from '../../../modules/post/entities/image.entity';
import { ImageBuilder } from '../../../builder/Image.builder';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import * as fs from 'fs';
import { join } from 'path';

const fileNames = fs.readdirSync(join(__dirname, '..', '..', '..', '..', 'dummy'));
const ImageFactory = localeKoSetSeederFactory(Image, (faker) =>
  new ImageBuilder().setImagePath(faker.helpers.arrayElement(fileNames)).build()
);
export default ImageFactory;
