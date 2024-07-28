import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Place } from '../../place/entities/place.entity';
import { PlPickCategory } from '../../pl_pick_category/entities/pl_pick_category.entity';
import { IsInt, IsPositive, IsString, IsUrl } from 'class-validator';
import { TimestampEntity } from '@common/entities/timestamp.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity({ comment: '플픽 카테고리에 종속된 플픽 정보 테이블' })
export class PlacePick extends TimestampEntity {
  @ApiProperty({
    example: '152',
    description: 'ID',
  })
  @IsInt()
  @IsPositive()
  @Expose()
  @PrimaryColumn()
  pl_pick_category_id: number;

  @ApiProperty({
    example: '152',
    description: 'ID',
  })
  @IsInt()
  @IsPositive()
  @Expose()
  @PrimaryColumn()
  place_id: number;

  @Column({ nullable: true })
  @IsString()
  @Expose()
  memo: string;

  @Column({ nullable: true })
  @IsString()
  @Expose()
  alias: string;

  @Column({ nullable: true })
  @IsUrl()
  @Expose()
  link: string;

  @ManyToOne(() => Place, (place) => place.placePicks)
  place: Place;

  @ManyToOne(() => PlPickCategory, (plPickCategory) => plPickCategory.placePicks)
  plPickCategory: PlPickCategory;
}
