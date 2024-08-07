import { Module } from '@nestjs/common';
import { PlacePickService } from './place_pick.service';
import { PlacePickController } from './place_pick.controller';
import { PlacePickRepository } from './place_pick.repository';
import { PlaceModule } from '../place/place.module';
import { PlPickCategoryModule } from '../pl_pick_category/pl_pick_category.module';

@Module({
  imports: [PlaceModule, PlPickCategoryModule],
  controllers: [PlacePickController],
  providers: [PlacePickService, PlacePickRepository],
})
export class PlacePickModule {}
