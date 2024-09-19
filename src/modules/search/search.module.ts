import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { PlaceModule } from '../place/place.module';
import { PlacePickModule } from '../place_pick/place_pick.module';
import { CommonModule } from '@common/common.module';
import { NaverApiService } from '@common/services/naver-api/naver-api.service';

@Module({
  imports: [PlaceModule, PlacePickModule, CommonModule],
  controllers: [SearchController],
  providers: [SearchService, NaverApiService],
})
export class SearchModule {}
