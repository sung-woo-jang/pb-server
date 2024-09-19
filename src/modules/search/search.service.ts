import { Injectable } from '@nestjs/common';
import { SearchPlaceRequestDto } from './dto/request/search-place-request.dto';
import { PlaceRepository } from '../place/repositories/place.repository';
import { NaverApiService } from '@common/services/naver-api/naver-api.service';
import { EntityManager } from 'typeorm';
import { SearchLocalItem } from '@common/services/naver-api/searchLocal.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SearchService {
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly naverApiService: NaverApiService
  ) {}

  async searchPlaces(searchPlaceRequestDto: SearchPlaceRequestDto, transactionManager: EntityManager) {
    const { mapx, mapy, keyword, offset, limit } = searchPlaceRequestDto;
    const naverLocalItems = await this.naverApiService.searchLocal(keyword, transactionManager);
    const dbLocalItems = await this.placeRepository.searchPlace(keyword, transactionManager);
    return this.mergeAndRemoveDuplicates(naverLocalItems, dbLocalItems);
  }

  private mergeAndRemoveDuplicates(naverItems: SearchLocalItem[], dbItems) {
    const uniqueMap = new Map();

    // DB 아이템 처리
    dbItems.forEach((item) => {
      uniqueMap.set(`${item.title}|${item.road_address}`, item);
    });

    // Naver 아이템 처리
    naverItems.forEach((item) => {
      const key = `${item.title}|${item.roadAddress}`;
      if (!uniqueMap.has(key)) {
        const [place_category_name, place_category_name_detail] = item.category.split('>');
        uniqueMap.set(key, {
          id: uuidv4(),
          title: item.title,
          address: item.address,
          road_address: item.roadAddress,
          description: item.description,
          telephone: item.telephone,
          mapx: item.mapx,
          mapy: item.mapy,
          placeCategory: {
            place_category_name,
            place_category_name_detail,
          },
        });
      }
    });

    return Array.from(uniqueMap.values());
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
