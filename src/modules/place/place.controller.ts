import { Body, Controller, Post } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { TransactionManager } from '@common/decorators/transaction-manager.decorator';
import { EntityManager } from 'typeorm';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto, @TransactionManager() transactionManager: EntityManager) {
    return this.placeService.createPlace(createPlaceDto, transactionManager);
  }

  @Post('embedding')
  createEmbedding(@Body('text') text: string) {
    return this.placeService.createEmbedding(text);
  }
}
