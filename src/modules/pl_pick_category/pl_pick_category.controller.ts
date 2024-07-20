import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { PlPickCategoryService } from './pl_pick_category.service';
import { CreatePlPickCategoryDto } from './dto/request/create-pl_pick_category.dto';
import { UpdatePlPickCategoryDto } from './dto/update-pl_pick_category.dto';
import { SessionAuthGuard } from '@common/guards/session-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities';

@ApiTags('pl-pick-category')
@UseGuards(SessionAuthGuard)
@Controller('pl-pick-category')
export class PlPickCategoryController {
  constructor(private readonly plPickCategoryService: PlPickCategoryService) {}

  @Post()
  create(@Body() createPlPickCategoryDto: CreatePlPickCategoryDto, @Session() session: Record<string, User>) {
    return this.plPickCategoryService.create(createPlPickCategoryDto, session.user);
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
