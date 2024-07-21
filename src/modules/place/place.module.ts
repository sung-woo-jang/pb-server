import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { PlaceCategoryRepository } from './placeCategory.repository';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository, PlaceCategoryRepository],
})
export class PlaceModule {}
