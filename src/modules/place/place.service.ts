import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceRepository } from './place.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}
  async createPlace(createPlaceDto: CreatePlaceDto, transactionManager: EntityManager) {
    return await this.placeRepository.createPlace(createPlaceDto, transactionManager);
  }

  findAll() {
    return `This action returns all place`;
  }

  findOne(id: number) {
    return `This action returns a #${id} place`;
  }

  update(id: number, updatePlaceDto: UpdatePlaceDto) {
    return `This action updates a #${id} place`;
  }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
