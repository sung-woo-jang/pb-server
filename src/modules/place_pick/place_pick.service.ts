import { Injectable } from '@nestjs/common';
import { CreatePlacePickDto } from './dto/create-place_pick.dto';
import { UpdatePlacePickDto } from './dto/update-place_pick.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlacePickBuilder } from '../../builder/place_pick.builder';
import { PlaceCategoryBuilder } from '../../builder/place_category.builder';
import { PlaceBuilder } from '../../builder/place.builder';
import { DataSource, Repository } from 'typeorm';
import { PlacePick } from './entities/place_pick.entity';
import { PlPickCategory } from '../pl_pick_category/entities/pl_pick_category.entity';
import { Place } from '../place/entities/place.entity';
import { PlaceCategory } from '../place/entities/place_category.entity';

@Injectable()
export class PlacePickService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(PlPickCategory) private plPickCategoryRepository: Repository<PlPickCategory>,
    @InjectRepository(PlacePick) private placePickRepository: Repository<PlacePick>,
    @InjectRepository(Place) private placeRepository: Repository<Place>,
    @InjectRepository(PlaceCategory) private placeCategoryRepository: Repository<PlaceCategory>
  ) {}
  async create(createPlacePickDto: CreatePlacePickDto) {
    const {
      placePick: placePickDto,
      plPickCategory: plPickCategoryDto,
      placeCategory: placeCategoryDto,
      place: placeDto,
    } = createPlacePickDto;
    return await this.dataSource.transaction(async (manager) => {
      // TODO: 유효성 검사 추가
      const placeCategory = await manager.withRepository(this.placeCategoryRepository).save({
        ...new PlaceCategoryBuilder()
          .setPlaceCategoryName(placeCategoryDto.place_category_name)
          .setPlaceCategoryNameDetail(placeCategoryDto.place_category_name_detail)
          .build(),
      });

      // place
      const place = await manager.withRepository(this.placeRepository).save({
        ...new PlaceBuilder()
          .setTitle(placeDto.title)
          .setAddress(placeDto.address)
          .setDescription(placeDto.description)
          .setRoadAddress(placeDto.road_address)
          .setTelephone(placeDto.telephone)
          .setMapx(placeDto.mapx)
          .setMapy(placeDto.mapy)
          .build(),
        placeCategory,
      });

      // pl_pick_category
      const plPickCategory = await this.plPickCategoryRepository.findOne({ where: { id: plPickCategoryDto.id } });

      // place_pick
      return await manager.withRepository(this.placePickRepository).save({
        ...new PlacePickBuilder()
          .setMemo(placePickDto.memo)
          .setLink(placePickDto.link)
          .setAlias(placePickDto.alias)
          .build(),
        place,
        plPickCategory,
      });
    });
  }

  async findAll() {
    return await this.placePickRepository
      .createQueryBuilder('placePick')
      .leftJoinAndSelect('placePick.place', 'place')
      .leftJoinAndSelect('placePick.plPickCategory', 'plPickCategory')
      .leftJoinAndSelect('place.placeCategory', 'placeCategory')
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} placePick`;
  }

  update(id: number, updatePlacePickDto: UpdatePlacePickDto) {
    return `This action updates a #${id} placePick`;
  }

  remove(id: number) {
    return `This action removes a #${id} placePick`;
  }
}
