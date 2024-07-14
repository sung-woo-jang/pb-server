import { Injectable } from '@nestjs/common';
import { CreatePlPickCategoryDto } from './dto/create-pl_pick_category.dto';
import { UpdatePlPickCategoryDto } from './dto/update-pl_pick_category.dto';

@Injectable()
export class PlPickCategoryService {
  create(createPlPickCategoryDto: CreatePlPickCategoryDto) {
    return 'This action adds a new plPickCategory';
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
