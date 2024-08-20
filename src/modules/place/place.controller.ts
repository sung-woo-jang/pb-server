import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { PlaceService } from './services/place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { TransactionManager } from '@common/decorators/transaction-manager.decorator';
import { EntityManager } from 'typeorm';
import { PlaceCategoryService } from './services/place-category.service';
import { CreatePlaceCategoryDto } from './dto/create-place_category.dto';
import { TransactionInterceptor } from '@common/interceptors/transaction.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmbeddingsRequestDto } from './dto/request/create-embeddings-request.dto';
import { SearchPlaceResponseDto } from './dto/response/search-place-response.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { SearchPlaceRequestDto } from './dto/request/search-place-request.dto';

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

  @Post('search')
  @ApiOperation({ summary: '장소 검색' })
  @ApiResponse({ status: 200, description: '검색 결과 반환' })
  @Serialize(SearchPlaceResponseDto)
  async searchPlaces(@Body() searchPlaceRequestDto: SearchPlaceRequestDto) {
    return this.placeService.searchPlaces(searchPlaceRequestDto);
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
