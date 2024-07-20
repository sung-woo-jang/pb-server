import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from '../../place/entities/place.entity';
import { CircleColors, PlPickCategory } from './pl_pick_category.entity';
import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsUrl } from 'class-validator';
import { TimestampEntity } from '@common/entities/timestamp.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity({ comment: '플픽 카테고리 테이블' })
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
  memo: string;

  @Column({ nullable: true })
  alias: string;

  @Column({ nullable: true })
  @IsUrl()
  link: string;

  @Column({ type: 'enum', enum: CircleColors, default: CircleColors.RED, nullable: false, comment: '' })
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CircleColors)
  picker_color: CircleColors;

  @ManyToOne(() => Place, (place) => place.placePlPickCategoryPivots)
  place: Place;

  @ManyToOne(() => PlPickCategory, (plPickCategory) => plPickCategory.placePlPickCategoryPivots)
  plPickCategory: PlPickCategory;
}
