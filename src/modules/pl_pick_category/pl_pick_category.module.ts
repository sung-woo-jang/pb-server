import { Module } from '@nestjs/common';
import { PlPickCategoryService } from './pl_pick_category.service';
import { PlPickCategoryController } from './pl_pick_category.controller';

@Module({
  controllers: [PlPickCategoryController],
  providers: [PlPickCategoryService],
})
export class PlPickCategoryModule {}
