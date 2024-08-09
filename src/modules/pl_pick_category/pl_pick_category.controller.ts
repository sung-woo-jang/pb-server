import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { PlPickCategoryService } from './pl_pick_category.service';
import { CreatePlPickCategoryDto } from './dto/request/create-pl_pick_category.dto';
import { UpdatePlPickCategoryDto } from './dto/request/update-pl_pick_category.dto';
import { SessionAuthGuard } from '@common/guards/session-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities';

@ApiTags('pl-pick-category(플픽 카테고리)')
@UseGuards(SessionAuthGuard)
@Controller('pl-pick-category')
export class PlPickCategoryController {
  constructor(private readonly plPickCategoryService: PlPickCategoryService) {}

  @Post()
  async createPlPickCategory(
    @Body() createPlPickCategoryDto: CreatePlPickCategoryDto,
    @Session() session: Record<string, User>
  ) {
    return await this.plPickCategoryService.createPlPickCategory(createPlPickCategoryDto, session.user);
  }

  @Get()
  async findUserCategories(@Session() session: Record<string, User>) {
    return await this.plPickCategoryService.findUserCategories(session.user);
  }
  @Get(':id')
  getCategoryWithPlacePicks(@Param('id', ParseIntPipe) id: number) {
    return this.plPickCategoryService.getCategoryWithPlacePicks(id);
  }

  @Get(':id/with-deleted')
  findOneWithDeleted(@Param('id', ParseIntPipe) id: number) {
    return this.plPickCategoryService.findOneWithDeleted(id);
  }

  @Patch()
  update(@Body() updatePlPickCategoryDto: UpdatePlPickCategoryDto) {
    return this.plPickCategoryService.update(updatePlPickCategoryDto);
  }

  @Delete(':id')
  deleteOrRestoreCategory(@Param('id', ParseIntPipe) id: number) {
    return this.plPickCategoryService.deleteOrRestoreCategory(id);
  }
}
