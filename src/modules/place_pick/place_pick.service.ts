import { Injectable } from '@nestjs/common';
import { CreatePlacePickDto } from './dto/create-place_pick.dto';
import { PlacePickBuilder } from '../../builder/place_pick.builder';
import { DataSource } from 'typeorm';
import { PlacePickRepository } from './place_pick.repository';
import { PlPickCategoryRepository } from '../pl_pick_category/pl_pick_category.repository';
import { PlaceService } from '../place/services/place.service';
import { User } from '../user/entities';

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
    return await this.placePickRepository.findPlacePickList(id);
  }
  async getAllMyPlacePick(user: User) {
    const placePickList = await this.placePickRepository.getAllMyPlacePick(user);
    const coords = [];
    placePickList.forEach((placePick) => {
      coords.push([placePick.place.mapy, placePick.place.mapx]);
    });
    return { coords };
  }
}
