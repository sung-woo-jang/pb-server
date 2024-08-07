import { Injectable } from '@nestjs/common';
import { PlaceCategoryRepository } from '../repositories/place-category.repository';
import { CreatePlaceCategoryDto } from '../dto/create-place_category.dto';
import { PlaceCategoryBuilder } from '../../../builder/place_category.builder';
import { EntityManager } from 'typeorm';

@Injectable()
export class PlaceCategoryService {
  constructor(private readonly placeCategoryRepository: PlaceCategoryRepository) {}

  async createPlaceCategory({ category }: CreatePlaceCategoryDto, transactionManager: EntityManager) {
    const [place_category_name, place_category_name_detail] = category.split('>');

    const placeCategory = await this.placeCategoryRepository.findOne({
      where: {
        place_category_name,
        place_category_name_detail,
      },
    });
    if (placeCategory) return placeCategory;

    return await this.placeCategoryRepository.createPlaceCategory(
      new PlaceCategoryBuilder()
        .setPlaceCategoryName(place_category_name)
        .setPlaceCategoryNameDetail(place_category_name_detail)
        .build(),
      transactionManager
    );
  }
}
