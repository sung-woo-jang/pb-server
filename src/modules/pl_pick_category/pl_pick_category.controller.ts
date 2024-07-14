import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlPickCategoryService } from './pl_pick_category.service';
import { CreatePlPickCategoryDto } from './dto/create-pl_pick_category.dto';
import { UpdatePlPickCategoryDto } from './dto/update-pl_pick_category.dto';

@Controller('pl-pick-category')
export class PlPickCategoryController {
  constructor(private readonly plPickCategoryService: PlPickCategoryService) {}

  @Post()
  create(@Body() createPlPickCategoryDto: CreatePlPickCategoryDto) {
    return this.plPickCategoryService.create(createPlPickCategoryDto);
  }

  @Get()
  findAll() {
    return this.plPickCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plPickCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlPickCategoryDto: UpdatePlPickCategoryDto) {
    return this.plPickCategoryService.update(+id, updatePlPickCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plPickCategoryService.remove(+id);
  }
}
