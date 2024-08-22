import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { PlaceModule } from '../place/place.module';
import { PlacePickModule } from '../place_pick/place_pick.module';

@Module({
  imports: [PlaceModule, PlacePickModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
