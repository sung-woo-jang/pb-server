import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsInt, IsString } from 'class-validator';
import { PlacePlPickCategoryPivot } from '../../pl_pick_category/entities/place_pl_pick_category_pivot.entity';
import { PlaceCategory } from './place_category.entity';
import { Post } from '../../post/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  comment: `장소(자동입력)\n장소 검색 했을 때 그 정보를 저장하는 용도`,
})
export class Place extends BaseEntityIncrement {
  @ApiProperty()
  @Column({ comment: '가게이름\n스타벅스 제물포역 DT점' })
  @IsString()
  title: string;

  @ApiProperty()
  @Column({ comment: '지번주소\n인천광역시 미추홀구 숭의동 78-2' })
  @IsString()
  address: string;

  @ApiProperty()
  @Column({ comment: '도로명주소\n인천광역시 미추홀구 경인로 103' })
  @IsString()
  road_address: string;

  @ApiProperty()
  @Column({ comment: '설명' })
  @IsString()
  description: string;

  @ApiProperty()
  @Column({ comment: '가게 전화번호' })
  @IsString()
  telephone: string;

  @ApiProperty()
  @Column({ type: 'double precision', comment: '126.654075' })
  @IsInt()
  mapx: number;

  @ApiProperty()
  @Column({ type: 'double precision', comment: '37.4665220' })
  @IsInt()
  mapy: number;

  @ManyToOne(() => PlaceCategory, (placeCategory) => placeCategory.places)
  placeCategory: PlaceCategory;

  @OneToMany(() => PlacePlPickCategoryPivot, (pivot) => pivot.place)
  placePlPickCategoryPivots: PlacePlPickCategoryPivot[];

  @OneToMany(() => Post, (post) => post.place)
  post: Post[];
}
