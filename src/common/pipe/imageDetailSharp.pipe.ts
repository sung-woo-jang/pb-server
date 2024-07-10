import { Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageDetailSharpPipe implements PipeTransform<Array<Express.Multer.File>> {
  async transform(files: Array<Express.Multer.File>) {
    return await Promise.all(
      files.map(async (file) => {
        file.buffer = await sharp(file.buffer).resize(800, null).toBuffer();
        return file;
      })
    );
  }
}
