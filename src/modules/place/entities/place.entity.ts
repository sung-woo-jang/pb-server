import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsNumber, IsString } from 'class-validator';
import { PlacePick } from '../../place_pick/entities/place_pick.entity';
import { PlaceCategory } from './place_category.entity';
import { Post } from '../../post/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { disassemble, getChoseong } from 'es-hangul';
import removeHtmlTags from '@common/utils/removeHtmlTags';

@Entity({
  comment: `장소(자동입력)\n장소 검색 했을 때 그 정보를 저장하는 용도`,
})
@Unique(['title', 'road_address'])
export class Place extends BaseEntityIncrement {
  @ApiProperty({ description: '가게이름 (예: 스타벅스 제물포역 DT점)' })
  @Column({ comment: '가게이름 (예: 스타벅스 제물포역 DT점)' })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty({ description: '가게이름 분해형 (예: ㅅㅡㅌㅏㅂㅓㄱㅅㅡ ㅈㅔㅁㅜㄹㅍㅗㅇㅕㄱ DTㅈㅓㅁ)' })
  @Column({ comment: '가게이름 분해형 (예: ㅅㅡㅌㅏㅂㅓㄱㅅㅡ ㅈㅔㅁㅜㄹㅍㅗㅇㅕㄱ DTㅈ)' })
  @IsString()
  @Expose()
  disassembled: string;

  @ApiProperty({ description: '가게이름 초성 (예: ㅅㅌㅂㅅ ㅈㅁㅍㅇ DTㅈ)' })
  @Column({ comment: '가게이름 초성 (예: ㅅㅌㅂㅅ ㅈㅁㅍㅇ DTㅈ)' })
  @IsString()
  @Expose()
  choseong: string;

  @ApiProperty({ description: '지번주소 (예: 인천광역시 미추홀구 숭의동 78-2)' })
  @Column({ comment: '지번주소 (예: 인천광역시 미추홀구 숭의동 78-2)' })
  @IsString()
  @Expose()
  address: string;

  @ApiProperty({ description: '도로명주소 (예: 인천광역시 미추홀구 경인로 103)' })
  @Column({ comment: '도로명주소 (예: 인천광역시 미추홀구 경인로 103)' })
  @IsString()
  @Expose()
  road_address: string;

  @ApiProperty({ description: '장소에 대한 간단한 설명' })
  @Column({ comment: '장소에 대한 간단한 설명' })
  @IsString()
  @Expose()
  description: string;

  @ApiProperty({ description: '가게 전화번호 (예: 032-123-4567)' })
  @Column({ comment: '가게 전화번호 (예: 032-123-4567)' })
  @IsString()
  @Expose()
  telephone: string;

  @ApiProperty({ description: '경도 (예: 126.654075)' })
  @Column({ type: 'double precision', comment: '경도 (예: 126.654075)' })
  @IsNumber()
  @Expose()
  mapx: number;

  @ApiProperty({ description: '위도 (예: 37.4665220)' })
  @Column({ type: 'double precision', comment: '위도 (예: 37.4665220)' })
  @IsNumber()
  @Expose()
  mapy: number;

  @ApiProperty({ type: () => PlaceCategory, description: '장소 카테고리 정보' })
  @ManyToOne(() => PlaceCategory, (placeCategory) => placeCategory.places)
  @Expose()
  placeCategory: PlaceCategory;

  @ApiProperty({ type: () => [PlacePick], description: '장소 픽 정보 목록' })
  @OneToMany(() => PlacePick, (placePick) => placePick.place)
  @Expose()
  placePicks: PlacePick[];

  @ApiProperty({ type: () => [Post], description: '해당 장소와 관련된 게시물 목록' })
  @OneToMany(() => Post, (post) => post.place)
  @Expose()
  post: Post[];

  @BeforeInsert()
  @BeforeUpdate()
  processTitle() {
    this.disassembled = disassemble(removeHtmlTags(this.title));
    this.choseong = getChoseong(removeHtmlTags(this.title));
  }
}
