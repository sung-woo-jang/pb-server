import { Module } from '@nestjs/common';
import { PlacePickService } from './place_pick.service';
import { PlacePickController } from './place_pick.controller';
import { PlacePickRepository } from './place_pick.repository';
import { PlPickCategoryRepository } from '../pl_pick_category/pl_pick_category.repository';
import { PlaceRepository } from '../place/place.repository';
import { PlaceCategoryRepository } from '../place/placeCategory.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlPickCategory } from '../pl_pick_category/entities/pl_pick_category.entity';
import { PlacePlPickCategoryPivot } from './entities/place_pl_pick_category_pivot.entity';
import { Place } from '../place/entities/place.entity';
import { PlaceCategory } from '../place/entities/place_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlPickCategory, PlacePlPickCategoryPivot, Place, PlaceCategory])],
  controllers: [PlacePickController],
  providers: [
    PlacePickService,
    PlacePickRepository,
    PlPickCategoryRepository,
    PlaceRepository,
    PlaceCategoryRepository,
  ],
})
export class PlacePickModule {}
