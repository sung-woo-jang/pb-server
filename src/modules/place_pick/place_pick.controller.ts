import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PlacePickService } from './place_pick.service';
import { CreatePlacePickDto } from './dto/create-place_pick.dto';
import { UpdatePlacePickDto } from './dto/update-place_pick.dto';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '@common/interceptors/serialize.interceptor';

@ApiTags('place-pick')
@Controller('place-pick')
export class PlacePickController {
  constructor(private readonly placePickService: PlacePickService) {}

  @Post()
  @Serialize(CreatePlacePickDto)
  create(@Body() createPlacePickDto: CreatePlacePickDto) {
    return this.placePickService.create(createPlacePickDto);
  }

  @Get('/:id')
  findPlacePickList(@Param('id', ParseIntPipe) id: number) {
    return this.placePickService.findPlacePickList(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlacePickDto: UpdatePlacePickDto) {
    return this.placePickService.update(+id, updatePlacePickDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placePickService.remove(+id);
  }
}
