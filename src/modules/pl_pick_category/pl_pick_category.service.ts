import { Injectable } from '@nestjs/common';
import { CreatePlPickCategoryDto } from './dto/request/create-pl_pick_category.dto';
import { UpdatePlPickCategoryDto } from './dto/request/update-pl_pick_category.dto';
import { PlPickCategoryRepository } from './pl_pick_category.repository';
import { PlPickCategoryBuilder } from '../../builder/pl_pick_category.builder';
import { User } from '../user/entities';
import * as _ from 'lodash';

@Injectable()
export class PlPickCategoryService {
  constructor(private readonly plPickCategoryRepository: PlPickCategoryRepository) {}
  async createPlPickCategory({ link, memo, title, picker_color }: CreatePlPickCategoryDto, user: User) {
    const plPickCategory = new PlPickCategoryBuilder()
      .setTitle(title)
      .setMemo(memo)
      .setLink(link)
      .setPickerColor(picker_color)
      .build();

    return await this.plPickCategoryRepository.save({ ...plPickCategory, user });
  }

  async findUserCategories(user: User) {
    return await this.plPickCategoryRepository.findUserCategories(user);
  }

  async getCategoryWithPlacePicks(id: number) {
    return await this.plPickCategoryRepository.getCategoryWithPlacePicks(id);
  }
  async findOneWithDeleted(id: number) {
    return await this.plPickCategoryRepository.findOneWithDeleted(id);
  }

  async update(updatePlPickCategoryDto: UpdatePlPickCategoryDto) {
    return await this.plPickCategoryRepository.updatePlPickCategory(updatePlPickCategoryDto);
  }

  async deleteOrRestoreCategory(id: number) {
    const plPickCategory = await this.findOneWithDeleted(id);
    if (_.isNull(plPickCategory.deletedAt)) {
      return await this.plPickCategoryRepository.deletePlPickCategory(id);
    } else {
      return await this.plPickCategoryRepository.restorePlPickCategory(id);
    }
  }
}
