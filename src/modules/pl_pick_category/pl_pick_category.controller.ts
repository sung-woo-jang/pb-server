import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { PlPickCategoryService } from './pl_pick_category.service';
import { CreatePlPickCategoryDto } from './dto/request/create-pl_pick_category.dto';
import { UpdatePlPickCategoryDto } from './dto/request/update-pl_pick_category.dto';
import { SessionAuthGuard } from '@common/guards/session-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities';

@ApiTags('pl-pick-category')
@UseGuards(SessionAuthGuard)
@Controller('pl-pick-category')
export class PlPickCategoryController {
  constructor(private readonly plPickCategoryService: PlPickCategoryService) {}

  @Post()
  async create(@Body() createPlPickCategoryDto: CreatePlPickCategoryDto, @Session() session: Record<string, User>) {
    return await this.plPickCategoryService.create(createPlPickCategoryDto, session.user);
  }

  @Get()
  async findAll(@Session() session: Record<string, User>) {
    return await this.plPickCategoryService.findAll(session.user);
  }

  @Get(':id')
  findOneWithDeleted(@Param('id', ParseIntPipe) id: number) {
    return this.plPickCategoryService.findOneWithDeleted(id);
  }

  @Patch()
  update(@Body() updatePlPickCategoryDto: UpdatePlPickCategoryDto) {
    return this.plPickCategoryService.update(updatePlPickCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.plPickCategoryService.remove(id);
  }
}
