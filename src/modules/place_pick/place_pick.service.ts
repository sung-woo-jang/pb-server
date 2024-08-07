import { Injectable } from '@nestjs/common';
import { CreatePlacePickDto } from './dto/create-place_pick.dto';
import { PlacePickBuilder } from '../../builder/place_pick.builder';
import { DataSource } from 'typeorm';
import { PlacePickRepository } from './place_pick.repository';
import { PlPickCategoryRepository } from '../pl_pick_category/pl_pick_category.repository';
import { PlaceService } from '../place/services/place.service';

@Injectable()
export class PlacePickService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly plPickCategoryRepository: PlPickCategoryRepository,
    private readonly placePickRepository: PlacePickRepository,
    private readonly placeService: PlaceService
  ) {}
  async createPlacePick({
    placePick: placePickDto,
    plPickCategory: plPickCategoryDto,
    place: placeDto,
  }: CreatePlacePickDto) {
    return await this.dataSource.transaction(async (manager) => {
      const place = await this.placeService.createPlace(placeDto, manager);

      // pl_pick_category
      const plPickCategory = await this.plPickCategoryRepository.findOne({ where: { id: plPickCategoryDto.id } });

      // place_pick
      const placePick = new PlacePickBuilder()
        .setMemo(placePickDto.memo)
        .setLink(placePickDto.link)
        .setAlias(placePickDto.alias)
        .build();

      return await this.placePickRepository.createPlacePick(
        {
          ...placePick,
          place,
          plPickCategory,
        },
        manager
      );
    });
  }

  async findPlacePickList(id: number) {
    const results = await this.placePickRepository.findPlacePickList(id);

    return results.map(({ place: { placeCategory, ...place }, plPickCategory, ...placePick }) => ({
      plPickCategory: {
        id: plPickCategory.id,
        title: plPickCategory.title,
        memo: plPickCategory.memo,
      },
      place: {
        title: place.title,
        address: place.address,
        road_address: place.road_address,
        description: place.description,
        telephone: place.telephone,
        mapx: place.mapx,
        mapy: place.mapy,
      },
      placeCategory: {
        place_category_name: placeCategory.place_category_name,
        place_category_name_detail: placeCategory.place_category_name_detail,
      },
      placePick: {
        id: place.id,
        memo: placePick.memo,
        link: placePick.link,
        alias: placePick.alias,
      },
    }));
  }
}
