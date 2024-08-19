import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { PlPickCategoryService } from './pl_pick_category.service';
import { CreatePlPickCategoryDto } from './dto/request/create-pl_pick_category.dto';
import { UpdatePlPickCategoryDto } from './dto/request/update-pl_pick_category.dto';
import { SessionAuthGuard } from '@common/guards/session-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { UserCategoriesResponseDto } from './dto/response/user-categories-response.dto';
import { PlPickCategoryWithPlacePickDto } from './dto/response/category-with-place-picks-response.dto';

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
  @Serialize(UserCategoriesResponseDto)
  async findUserCategories(@CurrentUser() user: User): Promise<UserCategoriesResponseDto[]> {
    return await this.plPickCategoryService.findUserCategories(user.id);
  }

  @Get('user/:userId')
  @Serialize(UserCategoriesResponseDto)
  async findCategoriesByUserId(@Param('userId') userId: string): Promise<UserCategoriesResponseDto[]> {
    return await this.plPickCategoryService.findUserCategories(userId);
  }

  @Get(':id')
  @Serialize(PlPickCategoryWithPlacePickDto)
  getCategoryWithPlacePicks(@Param('id', ParseIntPipe) id: number): Promise<PlPickCategoryWithPlacePickDto> {
    return this.plPickCategoryService.getCategoryWithPlacePicks(id);
  }

  @Patch()
  update(@Body() updatePlPickCategoryDto: UpdatePlPickCategoryDto) {
    return this.plPickCategoryService.update(updatePlPickCategoryDto);
  }

  @Delete(':id')
  deleteOrRestoreCategory(@Param('id', ParseIntPipe) id: number) {
    return this.plPickCategoryService.deleteOrRestoreCategory(id);
  }

  // 일단 안 씀
  @Get(':id/with-deleted')
  findOneWithDeleted(@Param('id', ParseIntPipe) id: number) {
    return this.plPickCategoryService.findOneWithDeleted(id);
  }
}
