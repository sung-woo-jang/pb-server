import { Injectable } from '@nestjs/common';
import { CreatePlPickCategoryDto } from './dto/request/create-pl_pick_category.dto';
import { UpdatePlPickCategoryDto } from './dto/update-pl_pick_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlPickCategoryRepository } from './pl_pick_category.repository';
import { PlPickCategoryBuilder } from '../../builder/pl_pick_category.builder';
import { User } from '../user/entities';

@Injectable()
export class PlPickCategoryService {
  constructor(
    @InjectRepository(PlPickCategoryRepository) private readonly plPickCategoryRepository: PlPickCategoryRepository
  ) {}
  async create({ link, memo, title, picker_color }: CreatePlPickCategoryDto, user: User) {
    const plPickCategory = new PlPickCategoryBuilder()
      .setTitle(title)
      .setMemo(memo)
      .setLink(link)
      .setPickerColor(picker_color)
      .build();

    return await this.plPickCategoryRepository.save({ ...plPickCategory, user });
  }

  findAll() {
    return `This action returns all plPickCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plPickCategory`;
  }

  update(id: number, updatePlPickCategoryDto: UpdatePlPickCategoryDto) {
    return `This action updates a #${id} plPickCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} plPickCategory`;
  }
}
