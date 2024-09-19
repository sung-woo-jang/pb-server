import { Body, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { PlaceService } from './services/place.service';
import { CreatePlaceRequestDto } from './dto/request/create-place-request.dto';
import { TransactionManager } from '@common/decorators/transaction-manager.decorator';
import { EntityManager } from 'typeorm';
import { PlaceCategoryService } from './services/place-category.service';
import { CreatePlaceCategoryDto } from './dto/request/create-place_category.dto';
import { TransactionInterceptor } from '@common/interceptors/transaction.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmbeddingsRequestDto } from './dto/request/create-embeddings-request.dto';
import { PlacePickInfoRequestDto } from './dto/request/placePick-info-request.dto';
import { PlaceInfoResponseDto } from './dto/response/place-info-response.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';

@ApiTags('place(장소)')
@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly placeCategoryService: PlaceCategoryService
  ) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  createPlace(@Body() createPlaceDto: CreatePlaceRequestDto, @TransactionManager() transactionManager: EntityManager) {
    return this.placeService.createPlace(createPlaceDto, transactionManager);
  }

  @Post('info')
  @Serialize(PlaceInfoResponseDto)
  placeInfo(@Body() placePickInfoDto: PlacePickInfoRequestDto) {
    return this.placeService.placeInfo(placePickInfoDto);
  }

  @Get('/:id')
  @Serialize(PlaceInfoResponseDto)
  getPlaceInfoById(@Param('id', ParseIntPipe) id: number) {
    return this.placeService.getPlaceInfoById(id);
  }

  @Post('embedding')
  createEmbedding(@Body('text') text: string) {
    return this.placeService.createEmbedding(text);
  }

  @Post('embeddings')
  createEmbeddings(@Body() createEmbeddingsRequestDto: CreateEmbeddingsRequestDto[]) {
    return this.placeService.createEmbeddings(createEmbeddingsRequestDto);
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
