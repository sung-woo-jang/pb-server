import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PlacePickService } from './place_pick.service';
import { CreatePlacePickDto } from './dto/create-place_pick.dto';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '@common/interceptors/serialize.interceptor';

@ApiTags('place-pick')
@Controller('place-pick')
export class PlacePickController {
  constructor(private readonly placePickService: PlacePickService) {}

  @Post()
  @Serialize(CreatePlacePickDto)
  createPlacePick(@Body() createPlacePickDto: CreatePlacePickDto) {
    return this.placePickService.createPlacePick(createPlacePickDto);
  }

  @Get('/:id')
  findPlacePickList(@Param('id', ParseIntPipe) id: number) {
    return this.placePickService.findPlacePickList(id);
  }
}
