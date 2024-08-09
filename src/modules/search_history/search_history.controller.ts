import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SearchHistoryService } from './search_history.service';
import { CreateSearchHistoryDto } from './dto/create-search_history.dto';
import { UpdateSearchHistoryDto } from './dto/update-search_history.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('search-history(검색 기록)')
@Controller('search-history')
export class SearchHistoryController {
  constructor(private readonly searchHistoryService: SearchHistoryService) {}

  @Post()
  create(@Body() createSearchHistoryDto: CreateSearchHistoryDto) {
    return this.searchHistoryService.create(createSearchHistoryDto);
  }

  @Get()
  findAll() {
    return this.searchHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchHistoryDto: UpdateSearchHistoryDto) {
    return this.searchHistoryService.update(+id, updateSearchHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchHistoryService.remove(+id);
  }
}
