import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { PlaceRepository } from '../repositories/place.repository';
import { EntityManager } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { EmbeddingResponse } from '../interfaces/embedding-response.interface';
import { PlaceBuilder } from '../../../builder/place.builder';
import { removeHtmlTags } from '@common/utils/removeHtmlTags';

@Injectable()
export class PlaceService {
  private readonly openaiApiKey: string;
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.openaiApiKey = this.configService.get<string>('OPENAI_API_KEY');
  }
  async createPlace(createPlaceDto: CreatePlaceDto, transactionManager: EntityManager) {
    const { title, telephone, address, road_address, mapy, mapx, description } = createPlaceDto;
    const { data: embeddingData } = await this.createEmbedding(removeHtmlTags(title));

    // title & road_address로 검색 시 있으면
    // 없으면

    return await this.placeRepository.createPlace(
      new PlaceBuilder()
        .setEmbedding(embeddingData[0].embedding)
        .setDescription(description)
        .setTitle(title)
        .setRoadAddress(road_address)
        .setAddress(address)
        .setTelephone(telephone)
        .setMapx(mapx)
        .setMapy(mapy)
        .build(),
      transactionManager
    );
  }

  async createEmbedding(inputText: string) {
    // TODO: lastValueFrom 알아보기

    const { data } = await lastValueFrom(
      this.httpService.post<EmbeddingResponse>(
        'https://api.openai.com/v1/embeddings',
        {
          input: inputText,
          model: 'text-embedding-3-small',
        },
        {
          headers: {
            Authorization: `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )
    );
    return data;
  }

  async getPlaceById(id: number) {
    return await this.placeRepository.findOne({ where: { id } });
  }
}
