import { Injectable } from '@nestjs/common';
import { SearchPlaceRequestDto } from './dto/request/search-place-request.dto';
import { PlaceService } from '../place/services/place.service';
import calculateDistance, { Coordinate } from '@common/utils/calculateDistance';
import cosineSimilarity from '@common/utils/cosineSimilarity';
import { PlaceRepository } from '../place/repositories/place.repository';
import { PlacePickRepository } from '../place_pick/place_pick.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly placeService: PlaceService,
    private readonly placeRepository: PlaceRepository,
    private readonly placePickRepository: PlacePickRepository
  ) {}

  async searchPlaces(searchPlaceRequestDto: SearchPlaceRequestDto) {
    const { limit, mapx, mapy, keyword } = searchPlaceRequestDto;
    const userLocation: Coordinate = { mapx, mapy };

    const places = await this.placeRepository.searchPlaces();
    const searchVector = await this.placeService.createEmbedding(keyword);

    const rankedPlaces = places
      .map((place) => ({
        ...place,
        similarity: cosineSimilarity(place.embedding, searchVector),
        distance: calculateDistance(userLocation, { mapx: place.mapx, mapy: place.mapy }),
      }))
      .sort((a, b) => {
        // 유사도와 거리에 가중치를 부여하여 종합 점수 계산
        const scoreA = a.similarity * 0.7 - (a.distance / 10) * 0.3; // 거리는 10km를 기준으로 정규화
        const scoreB = b.similarity * 0.7 - (b.distance / 10) * 0.3;
        return scoreB - scoreA;
      })
      .slice(0, limit);

    const placePickCounts = await this.placePickRepository.countPlacePicksByPlaceIds(places.map((place) => place.id));

    return this.combinePlacesWithCounts(rankedPlaces, placePickCounts);
  }

  private combinePlacesWithCounts(places: any[], placePickCounts: any[]) {
    const countMap = this.createCountMap(placePickCounts);
    return places.map((place) => ({
      ...place,
      placePickCount: countMap[place.id] || 0,
    }));
  }

  private createCountMap(placePickCounts: any[]) {
    return placePickCounts.reduce((acc, curr) => {
      acc[curr.place_id] = parseInt(curr.count, 10);
      return acc;
    }, {});
  }

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
