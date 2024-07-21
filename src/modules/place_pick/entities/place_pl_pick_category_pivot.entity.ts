import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from '../../place/entities/place.entity';
import { PlPickCategory } from '../../pl_pick_category/entities/pl_pick_category.entity';
import { IsInt, IsPositive, IsUrl } from 'class-validator';
import { TimestampEntity } from '@common/entities/timestamp.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity({ comment: '플픽 카테고리에 종속된 플픽 정보 테이블' })
export class PlacePlPickCategoryPivot extends TimestampEntity {
  @ApiProperty({
    example: '152',
    description: 'ID',
  })
  @IsInt()
  @IsPositive()
  @Expose()
  @PrimaryGeneratedColumn('increment')
  pl_pick_category_id: number;

  @ApiProperty({
    example: '152',
    description: 'ID',
  })
  @IsInt()
  @IsPositive()
  @Expose()
  @PrimaryGeneratedColumn('increment')
  place_id: number;

  @Column({ nullable: true })
  @Expose()
  memo: string;

  @Column({ nullable: true })
  @Expose()
  alias: string;

  @Column({ nullable: true })
  @IsUrl()
  @Expose()
  link: string;

  @ManyToOne(() => Place, (place) => place.placePlPickCategoryPivots)
  place: Place;

  @ManyToOne(() => PlPickCategory, (plPickCategory) => plPickCategory.placePlPickCategoryPivots)
  plPickCategory: PlPickCategory;
}
