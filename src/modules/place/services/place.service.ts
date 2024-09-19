import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaceRequestDto } from '../dto/request/create-place-request.dto';
import { PlaceRepository } from '../repositories/place.repository';
import { EntityManager } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { EmbeddingResponse } from '../interfaces/embedding-response.interface';
import { PlaceBuilder } from '../../../builder/place.builder';
import concatenateValues from '@common/utils/concatenateValues';
import { PlacePickInfoRequestDto } from '../dto/request/placePick-info-request.dto';
import * as _ from 'lodash';
import { Place } from '../entities/place.entity';

@Injectable()
export class PlaceService {
  private readonly openaiApiKey: string = this.configService.get<string>('OPENAI_API_KEY');
  private readonly apiUrl: string = 'https://api.openai.com/v1/embeddings';
  private readonly model: string = 'text-embedding-3-small';
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}
  async createPlace(createPlaceDto: CreatePlaceRequestDto, transactionManager: EntityManager) {
    const { title, telephone, address, road_address, mapy, mapx, description } = createPlaceDto;

    const newPlace = new PlaceBuilder()
      .setDescription(description)
      .setTitle(title)
      .setChoseong(title)
      .setDisassembled(title)
      .setRoadAddress(road_address)
      .setAddress(address)
      .setTelephone(telephone)
      .setMapx(mapx)
      .setMapy(mapy)
      .build();

    const result = await this.placeRepository.createPlace(newPlace, transactionManager);

    const id = result.identifiers[0].id;

    return await transactionManager.findOne(Place, { where: { id } });
  }

  async createEmbedding(input: string) {
    // TODO: lastValueFrom 알아보기
    const model = this.model;
    const {
      data: { data },
    } = await lastValueFrom(
      this.httpService.post<EmbeddingResponse>(
        this.apiUrl,
        {
          input,
          model,
        },
        {
          headers: {
            Authorization: `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )
    );

    return data[0].embedding;
  }

  async createEmbeddings(data: Record<string, any>[]) {
    const batchSize = 10; // 적절한 배치 크기로 조정
    const results = [];

    const processData = data.map(({ title }) => concatenateValues({ title }));

    for (let i = 0; i < processData.length; i += batchSize) {
      const batch = processData.slice(i, i + batchSize);
      const response = await this.requestEmbedding(batch);
      results.push(...response.data.data);
    }

    return results;
  }

  private async requestEmbedding(batch: string[]) {
    return await lastValueFrom(
      this.httpService.post<EmbeddingResponse>(
        this.apiUrl,
        { input: batch, model: this.model },
        {
          headers: {
            Authorization: `Bearer ${this.openaiApiKey}`,
          },
        }
      )
    );
  }

  async findPlaceById(id: number) {
    return await this.placeRepository.findOne({ where: { id } });
  }

  async placeInfo(placePickInfoDto: PlacePickInfoRequestDto) {
    const data = await this.placeRepository.placeInfo(placePickInfoDto);
    if (_.isNil(data)) {
      throw new NotFoundException('데이터를 찾을 수 없습니다.');
    }
    return data;
  }
}
