import { Injectable, PipeTransform } from '@nestjs/common';
import { extname, join } from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';

@Injectable()
export class ImageSharpPipe
  implements
    PipeTransform<{
      productImages: Express.Multer.File[];
      detailImages: Express.Multer.File[];
    }>
{
  async transform(files: {
    productImages: Express.Multer.File[];
    detailImages: Express.Multer.File[];
  }) {
    const transformedFiles = { ...files };
    for (const field in files) {
      transformedFiles[field] = [];
      for (const [index, file] of files[field].entries()) {
        try {
          const newFileName = `${Date.now()}-${index}${extname(
            file.originalname,
          )}`;
          const outputPath = join('uploads', newFileName);

          if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads', { recursive: true });
          }
          await sharp(file.buffer)
            // .resize(600, 600)
            .toFile(outputPath);
          file.path = outputPath;
          file.filename = newFileName;
          transformedFiles[field].push(file);
        } catch (error) {
          console.error(
            `Failed to process file ${file.originalname}: ${error}`,
          );
        }
      }
    }
    return transformedFiles;
  }
}
