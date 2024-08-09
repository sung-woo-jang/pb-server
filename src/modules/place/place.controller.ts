import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { PlaceService } from './services/place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { TransactionManager } from '@common/decorators/transaction-manager.decorator';
import { EntityManager } from 'typeorm';
import { PlaceCategoryService } from './services/place-category.service';
import { CreatePlaceCategoryDto } from './dto/create-place_category.dto';
import { TransactionInterceptor } from '@common/interceptors/transaction.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('place(장소)')
@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly placeCategoryService: PlaceCategoryService
  ) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  createPlace(@Body() createPlaceDto: CreatePlaceDto, @TransactionManager() transactionManager: EntityManager) {
    return this.placeService.createPlace(createPlaceDto, transactionManager);
  }

  @Post('embedding')
  createEmbedding(@Body('text') text: string) {
    return this.placeService.createEmbedding(text);
  }

  @Post('category')
  @UseInterceptors(TransactionInterceptor)
  createPlaceCategory(
    @Body() createPlaceCategoryDto: CreatePlaceCategoryDto,
    @TransactionManager() transactionManager: EntityManager
  ) {
    return this.placeCategoryService.createPlaceCategory(createPlaceCategoryDto, transactionManager);
  }
}
