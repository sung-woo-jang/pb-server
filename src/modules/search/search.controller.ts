import { Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { SearchPlaceRequestDto } from './dto/request/search-place-request.dto';
import { getSearchPlaceDetailDto } from './dto/response/place-datail-response.dto';
import { TransactionManager } from '@common/decorators/transaction-manager.decorator';
import { EntityManager } from 'typeorm';
import { TransactionInterceptor } from '@common/interceptors/transaction.interceptor';
import { SearchPlaceResponseDto } from './dto/response/search-place-response.dto';

@ApiTags('search(검색)')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('')
  @ApiOperation({ summary: '장소 검색' })
  @ApiResponse({ status: 200, description: '검색 결과 반환' })
  @Serialize(SearchPlaceResponseDto)
  @UseInterceptors(TransactionInterceptor)
  async searchPlaces(
    @Query() searchPlaceRequestDto: SearchPlaceRequestDto,
    @TransactionManager() transactionManager: EntityManager
  ) {
    return await this.searchService.searchPlaces(searchPlaceRequestDto, transactionManager);
  }

  @Get('/:placeId')
  @Serialize(getSearchPlaceDetailDto)
  async getSearchPlaceDetail(@Param('placeId', ParseIntPipe) placeId: number) {
    return await this.searchService.getSearchPlaceDetail(placeId);
  }
}
