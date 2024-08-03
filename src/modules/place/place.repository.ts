import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceBuilder } from '../../builder/place.builder';

@Injectable()
export class PlaceRepository extends Repository<Place> {
  constructor(private dataSource: DataSource) {
    super(Place, dataSource.createEntityManager());
  }
  async createPlace(createPlaceDto: CreatePlaceDto, transactionManager: EntityManager) {
    return await transactionManager.save(
      Place,
      new PlaceBuilder()
        .setTitle(createPlaceDto.title)
        .setMapx(createPlaceDto.mapx)
        .setMapy(createPlaceDto.mapy)
        .setTelephone(createPlaceDto.telephone)
        .setDescription(createPlaceDto.description)
        .setAddress(createPlaceDto.address)
        .setRoadAddress(createPlaceDto.road_address)
        .build()
    );
  }
}
