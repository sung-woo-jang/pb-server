import { Module } from '@nestjs/common';
import { PlacePickService } from './place_pick.service';
import { PlacePickController } from './place_pick.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlPickCategory } from '../pl_pick_category/entities/pl_pick_category.entity';
import { PlacePick } from './entities/place_pick.entity';
import { Place } from '../place/entities/place.entity';
import { PlaceCategory } from '../place/entities/place_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlPickCategory, PlacePick, Place, PlaceCategory])],
  controllers: [PlacePickController],
  providers: [PlacePickService],
})
export class PlacePickModule {}
