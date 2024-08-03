import { Injectable, PipeTransform } from '@nestjs/common';
import { extname, join } from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { UploadedFilesDto } from '../dtos/uploaded-files.dto';

@Injectable()
export class ImageSharpPipe implements PipeTransform<UploadedFilesDto> {
  async transform(files: { placeImages: Express.Multer.File[] }) {
    const uploadDir = 'uploads';

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const transformedFiles = { ...files };
    for (const field in files) {
      transformedFiles[field] = await Promise.all(
        files[field].map(async (file: Express.Multer.File, index: number) => {
          try {
            // 새로운 파일 이름 생성
            const newFileName = `${Date.now()}-${index}${extname(file.originalname)}`;
            const outputPath = join(uploadDir, newFileName);

            // sharp 사용하여 파일을 저장
            await sharp(file.buffer)
              // .resize(600, 600) // 필요한 경우 크기 조정
              .toFile(outputPath);

            // 파일 경로와 파일명 업데이트
            return {
              ...file,
              path: outputPath,
              filename: newFileName,
            };
          } catch (e) {
            console.error(`Failed to process file ${file.originalname}: ${e}`);
            return null;
          }
        })
      );
      transformedFiles[field] = transformedFiles[field].filter((file: Express.Multer.File) => file !== null);
    }
    return transformedFiles;
  }
}
