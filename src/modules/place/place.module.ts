import { Module } from '@nestjs/common';
import { PlaceService } from './services/place.service';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './repositories/place.repository';
import { HttpModule } from '@nestjs/axios';
import { PlaceCategoryService } from './services/place-category.service';
import { PlaceCategoryRepository } from './repositories/place-category.repository';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository, PlaceCategoryService, PlaceCategoryRepository],
  exports: [PlaceService, PlaceRepository, PlaceCategoryService, PlaceCategoryRepository],
})
export class PlaceModule {}
