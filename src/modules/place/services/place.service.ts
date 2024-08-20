import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { PlaceRepository } from '../repositories/place.repository';
import { EntityManager } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { EmbeddingResponse } from '../interfaces/embedding-response.interface';
import { PlaceBuilder } from '../../../builder/place.builder';
import removeHtmlTags from '@common/utils/removeHtmlTags';
import concatenateValues from '@common/utils/concatenateValues';
import cosineSimilarity from '@common/utils/cosineSimilarity';
import { SearchPlaceRequestDto } from '../dto/request/search-place-request.dto';
import calculateDistance, { Coordinate } from '@common/utils/calculateDistance';

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
  async createPlace(createPlaceDto: CreatePlaceDto, transactionManager: EntityManager) {
    const { title, telephone, address, road_address, mapy, mapx, description } = createPlaceDto;

    const place = await this.placeRepository.findOne({ where: { title, road_address } });
    if (place) return place;

    const { data: embeddingData } = await this.createEmbedding(`${removeHtmlTags(title)} ${address} ${road_address}`);

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

  async searchPlaces(searchPlaceRequestDto: SearchPlaceRequestDto) {
    const { limit, mapx, mapy, keyword } = searchPlaceRequestDto;
    const input = concatenateValues({ mapx, mapy, keyword });
    const { data: embeddingData } = await this.createEmbedding(input);
    const searchVector = embeddingData[0].embedding;

    const userLocation: Coordinate = { mapx, mapy };

    const places = await this.placeRepository.find();

    // 정확도순
    return places
      .map((place) => ({
        ...place,
        similarity: cosineSimilarity(place.embedding, searchVector),
        distance: calculateDistance(userLocation, { mapx: place.mapx, mapy: place.mapy }),
      }))
      .sort((a, b) => {
        // 유사도와 거리에 가중치를 부여하여 종합 점수 계산
        const scoreA = a.similarity * 0.7 - (a.distance / 10) * 0.3; // 거리는 10km를 기준으로 정규화
        const scoreB = b.similarity * 0.7 - (b.distance / 10) * 0.3;
        return scoreB - scoreA;
      })
      .slice(0, limit);
  }

  async createEmbedding(input: string) {
    // TODO: lastValueFrom 알아보기
    const model = this.model;
    const { data } = await lastValueFrom(
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
    return data;
  }

  async createEmbeddings(data: Record<string, any>[]) {
    const batchSize = 10; // 적절한 배치 크기로 조정
    const results = [];

    const processData = data.map(({ link, description, telephone, ...obj }) => concatenateValues(obj));

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
}
