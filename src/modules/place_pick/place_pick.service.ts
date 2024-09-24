import { Injectable } from '@nestjs/common';
import { CreatePlacePickDto } from './dto/request/create-place_pick.dto';
import { DataSource, In } from 'typeorm';
import { PlacePickRepository } from './place_pick.repository';
import { PlPickCategoryRepository } from '../pl_pick_category/pl_pick_category.repository';
import { PlaceService } from '../place/services/place.service';
import { User } from '../user/entities';
import { DeletePlacePickRequestDto } from './dto/request/delete-place_pick-request.dto';
import { PlacePick } from './entities/place_pick.entity';

@Injectable()
export class PlacePickService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly plPickCategoryRepository: PlPickCategoryRepository,
    private readonly placePickRepository: PlacePickRepository,
    private readonly placeService: PlaceService
  ) {}
  async createPlacePick({ place_id, link, memo, alias, pl_pick_category_ids }: CreatePlacePickDto) {
    return await this.dataSource.transaction(async (manager) => {
      const place = await this.placeService.findPlaceById(place_id);
      const plPickCategories = await this.plPickCategoryRepository.findBy({ id: In(pl_pick_category_ids) });

      // 1. 기존의 모든 PlacePick 찾기
      const existingPlacePicks = await manager.getRepository(PlacePick).find({
        where: { place: { id: place_id } },
        relations: ['plPickCategory'],
      });

      // 2. 삭제해야 할 PlacePick 찾기 및 삭제
      const categoriesToKeep = new Set(pl_pick_category_ids);
      const placePicksToDelete = existingPlacePicks.filter((pp) => !categoriesToKeep.has(pp.plPickCategory.id));
      await manager.getRepository(PlacePick).remove(placePicksToDelete);

      // 3. 새로운 PlacePick 생성 또는 기존 PlacePick 업데이트
      const results = [];
      for (const plPickCategory of plPickCategories) {
        let placePick = existingPlacePicks.find((pp) => pp.plPickCategory.id === plPickCategory.id);

        if (placePick) {
          // 기존 PlacePick 업데이트
          placePick.memo = memo;
          placePick.link = link;
          placePick.alias = alias;
        } else {
          // 새 PlacePick 생성
          placePick = this.placePickRepository.create({ memo, link, alias, place, plPickCategory });
        }

        placePick = await this.placePickRepository.createPlacePick(placePick, manager);
        results.push(placePick);
      }

      return results;
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
    // return { placePickList, coords };
    return placePickList;
  }

  async deletePlacePick(deletePlacePickRequestDto: DeletePlacePickRequestDto, user: User) {
    return await this.placePickRepository.deletePlacePick(deletePlacePickRequestDto, user);
  }
}
