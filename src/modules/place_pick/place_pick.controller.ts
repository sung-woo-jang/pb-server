import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PlacePickService } from './place_pick.service';
import { CreatePlacePickDto } from './dto/create-place_pick.dto';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { PlacePickListResponseDto } from './dto/response/place-pick-list-response.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '../user/entities';
import { AllPlacePickListResponseDto } from './dto/response/all-place-pick-list-response.dto';

@ApiTags('place-pick(플픽)')
@Controller('place-pick')
export class PlacePickController {
  constructor(private readonly placePickService: PlacePickService) {}

  @Post()
  @Serialize(CreatePlacePickDto)
  createPlacePick(@Body() createPlacePickDto: CreatePlacePickDto) {
    return this.placePickService.createPlacePick(createPlacePickDto);
  }

  @Get('/:id')
  @Serialize(PlacePickListResponseDto)
  findPlacePickList(@Param('id', ParseIntPipe) id: number) {
    return this.placePickService.findPlacePickList(id);
  }

  //  내 플픽 리스트 전부 가져오기
  @Get()
  @Serialize(AllPlacePickListResponseDto)
  getAllMyPlacePick(@CurrentUser() user: User) {
    return this.placePickService.getAllMyPlacePick(user);
  }
}
