import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsNotEmpty } from 'class-validator';
import { Place } from './place.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { disassemble, getChoseong } from 'es-hangul';

@Entity({
  comment: `장소 카테고리(자동입력)\n장소 검색 했을 때 그 정보를 저장하는 용도`,
})
@Unique(['place_category_name', 'place_category_name_detail'])
export class PlaceCategory extends BaseEntityIncrement {
  @Column({ comment: '카테고리 대분류 (예: 음식점, 카페,디저트)' })
  @ApiProperty({ description: '카테고리 대분류 (예: 음식점, 카페,디저트)' })
  @IsNotEmpty()
  @Expose()
  place_category_name: string;

  @Column({ comment: '카테고리 대분류 분해형 (예: ㅇㅡㅁㅅㅣㄱㅈㅓㅁ, ㅋㅏㅍㅔ,ㄷㅣㅈㅓㅌㅡ)' })
  @ApiProperty({ description: '카테고리 대분류 분해형 (예: ㅇㅡㅁㅅㅣㄱㅈㅓㅁ, ㅋㅏㅍㅔ,ㄷㅣㅈㅓㅌㅡ)' })
  @Expose()
  place_category_name_disassembled: string;

  @Column({ comment: '카테고리 대분류 초성 (예: ㅇㅅㅈ, ㅋㅍ,ㄷㅈㅌ)' })
  @ApiProperty({ description: '카테고리 대분류 초성 (예: ㅇㅅㅈ, ㅋㅍ,ㄷㅈㅌ)' })
  @Expose()
  place_category_name_choseong: string;

  @Column({ comment: '카테고리 소분류 (예: 한식, 중식, 카페)' })
  @ApiProperty({ description: '카테고리 소분류 (예: 한식, 중식, 카페)' })
  @IsNotEmpty()
  @Expose()
  place_category_name_detail: string;

  @Column({ comment: '카테고리 소분류 분해형 (예: ㅎㅏㄴㅅㅣㄱ, ㅈㅜㅇㅅㅣㄱ, ㅋㅏㅍㅔ)' })
  @ApiProperty({ description: '카테고리 소분류 분해형 (예: ㅎㅏㄴㅅㅣㄱ, ㅈㅜㅇㅅㅣㄱ, ㅋㅏㅍㅔ)' })
  @Expose()
  place_category_name_detail_disassembled: string;

  @Column({ comment: '카테고리 소분류 초성 (예: ㅎㅅ, ㅈㅅ, ㅋㅍ)' })
  @ApiProperty({ description: '카테고리 소분류 초성 (예: ㅎㅅ, ㅈㅅ, ㅋㅍ)' })
  @Expose()
  place_category_name_detail_choseong: string;

  @OneToMany(() => Place, (place) => place.placeCategory)
  places: Place[];

  @BeforeInsert()
  @BeforeUpdate()
  processCategories() {
    this.place_category_name_choseong = getChoseong(this.place_category_name);
    this.place_category_name_disassembled = disassemble(this.place_category_name);
    this.place_category_name_detail_choseong = getChoseong(this.place_category_name_detail);
    this.place_category_name_detail_disassembled = disassemble(this.place_category_name_detail);
  }
}
