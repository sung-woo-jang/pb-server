import { Module } from '@nestjs/common';
import { PlPickCategoryService } from './pl_pick_category.service';
import { PlPickCategoryController } from './pl_pick_category.controller';
import { PlPickCategoryRepository } from './pl_pick_category.repository';

@Module({
  controllers: [PlPickCategoryController],
  providers: [PlPickCategoryService, PlPickCategoryRepository],
})
export class PlPickCategoryModule {}
