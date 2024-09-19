import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { SearchLocal, SearchLocalItem } from '@common/services/naver-api/searchLocal.interface';
import { EntityManager } from 'typeorm';
import { PlaceService } from '../../../modules/place/services/place.service';
import { PlaceCategoryService } from '../../../modules/place/services/place-category.service';
import removeHtmlTags from '@common/utils/removeHtmlTags';
import addDecimalPoint from '@common/utils/addDecimalPoint';

@Injectable()
export class NaverApiService {
  private readonly apiUrl: string = 'https://openapi.naver.com/v1/search/local.json';
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly placeService: PlaceService,
    private readonly placeCategoryService: PlaceCategoryService
  ) {}

  async searchLocal(query: string, transactionManager: EntityManager): Promise<SearchLocalItem[]> {
    const client_id = this.config.get<string>('naver.clientId');
    const client_secret = this.config.get<string>('naver.clientSecret');

    const {
      data: { items },
    } = await lastValueFrom(
      this.httpService.get<SearchLocal>(this.apiUrl, {
        params: {
          query,
          display: 10,
          start: 1,
          sort: 'random',
        },
        headers: {
          'X-Naver-Client-Id': client_id,
          'X-Naver-Client-Secret': client_secret,
        },
      })
    );

    for (const item of items) {
      const { title, address, roadAddress, description, mapx, mapy, telephone, category } = item;
      const placeCategory = await this.placeCategoryService.createPlaceCategory({ category }, transactionManager);
      await this.placeService.createPlace(
        {
          title,
          telephone,
          address,
          description,
          mapy,
          mapx,
          road_address: roadAddress,
          placeCategory,
        },
        transactionManager
      );
    }

    return items.map(({ title, mapy, mapx, ...rest }) => {
      return {
        title: removeHtmlTags(title),
        mapy: Number(addDecimalPoint(mapy)),
        mapx: Number(addDecimalPoint(mapx)),
        ...rest,
      };
    });
  }
}
