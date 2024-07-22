import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsNotEmpty } from 'class-validator';
import { Place } from './place.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity({
  comment: `장소 카테고리(자동입력)\n장소 검색 했을 때 그 정보를 저장하는 용도`,
})
export class PlaceCategory extends BaseEntityIncrement {
  @Column({ comment: '카페,디저트' })
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  place_category_name: string;

  @Column({ comment: '카페' })
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  place_category_name_detail: string;

  @OneToMany(() => Place, (place) => place.placeCategory)
  places: Place[];
}
