import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Place } from '../entities/place.entity';
import { PlacePickInfoRequestDto } from '../dto/request/placePick-info-request.dto';

@Injectable()
export class PlaceRepository extends Repository<Place> {
  constructor(private dataSource: DataSource) {
    super(Place, dataSource.createEntityManager());
  }
  async createPlace(place: Place, transactionManager: EntityManager) {
    return await transactionManager.save(Place, { ...place });
  }

  async getPlaceDetail(placeId: number) {
    return await this.createQueryBuilder('place')
      .select(['place.id', 'place.title', 'place.address', 'place.road_address'])
      .leftJoin('place.post', 'post')
      .addSelect(['post.id', 'post.content', 'post.visitDate', 'post.rate'])
      .leftJoin('post.user', 'user')
      .addSelect(['user.id', 'user.nickname', 'user.profileImage'])
      .leftJoin('post.keywords', 'keyword')
      .addSelect(['keyword.id', 'keyword.keyword'])
      .leftJoin('post.images', 'image')
      .addSelect(['image.id', 'image.image_path'])
      .where('place.id = :placeId', { placeId })
      .getOne();
  }

  async getPlaceAverageRate(placeId: number) {
    const { place_average_rate } = await this.createQueryBuilder('place')
      .select('AVG(post.rate)', 'place_average_rate')
      .leftJoin('place.post', 'post')
      .where('place.id = :placeId', { placeId })
      .getRawOne();

    return Number(place_average_rate).toFixed(2);
  }

  async getTotalPosts(placeId: number) {
    const { total_posts } = await this.createQueryBuilder('place')
      .select('COUNT(post.id)', 'total_posts')
      .leftJoin('place.post', 'post')
      .where('place.id = :placeId', { placeId })
      .getRawOne();
    return Number(total_posts);
  }

  async placeInfo({ mapx, mapy }: PlacePickInfoRequestDto) {
    return await this.createQueryBuilder('place')
      .select([
        'place.id',
        'place.title',
        'place.address',
        'place.road_address',
        'place.description',
        'place.telephone',
      ])
      .leftJoin('place.placeCategory', 'placeCategory')
      .addSelect(['placeCategory.place_category_name', 'placeCategory.place_category_name_detail'])
      .where('place.mapx = :mapx', { mapx })
      .andWhere('place.mapy = :mapy', { mapy })
      .getOne();
  }
}
