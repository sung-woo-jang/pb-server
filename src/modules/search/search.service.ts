import { Injectable } from '@nestjs/common';
import { SearchPlaceRequestDto } from './dto/request/search-place-request.dto';
import { PlaceService } from '../place/services/place.service';
import { PlaceRepository } from '../place/repositories/place.repository';
import { PlacePickRepository } from '../place_pick/place_pick.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly placeService: PlaceService,
    private readonly placeRepository: PlaceRepository,
    private readonly placePickRepository: PlacePickRepository
  ) {}

  async searchPlaces(searchPlaceRequestDto: SearchPlaceRequestDto) {}

  async getSearchPlaceDetail(placeId: number) {
    const placeData = await this.placeRepository.getPlaceDetail(placeId);
    const total_posts = await this.placeRepository.getTotalPosts(placeId);
    const place_average_rate = await this.placeRepository.getPlaceAverageRate(placeId);
    return {
      ...placeData,
      total_posts,
      place_average_rate,
    };
  }
}
