import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsNumber, IsString } from 'class-validator';
import { PlacePick } from '../../place_pick/entities/place_pick.entity';
import { PlaceCategory } from './place_category.entity';
import { Post } from '../../post/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity({
  comment: `장소(자동입력)\n장소 검색 했을 때 그 정보를 저장하는 용도`,
})
@Unique(['title', 'road_address'])
export class Place extends BaseEntityIncrement {
  @ApiProperty()
  @Column({ comment: '가게이름\n스타벅스 제물포역 DT점' })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty()
  @Column({ comment: '지번주소\n인천광역시 미추홀구 숭의동 78-2' })
  @IsString()
  @Expose()
  address: string;

  @ApiProperty()
  @Column({ comment: '도로명주소\n인천광역시 미추홀구 경인로 103' })
  @IsString()
  @Expose()
  road_address: string;

  @ApiProperty()
  @Column({ comment: '설명' })
  @IsString()
  @Expose()
  description: string;

  @ApiProperty()
  @Column({ comment: '가게 전화번호' })
  @IsString()
  @Expose()
  telephone: string;

  @ApiProperty()
  @Column({ type: 'double precision', comment: '126.654075' })
  @IsNumber()
  @Expose()
  mapx: number;

  @ApiProperty()
  @Column({ type: 'double precision', comment: '37.4665220' })
  @IsNumber()
  @Expose()
  mapy: number;

  @Column('float', { array: true })
  embedding: number[];

  @ManyToOne(() => PlaceCategory, (placeCategory) => placeCategory.places)
  placeCategory: PlaceCategory;

  @OneToMany(() => PlacePick, (placePick) => placePick.place)
  placePicks: PlacePick[];

  @OneToMany(() => Post, (post) => post.place)
  post: Post[];
}
