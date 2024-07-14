import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsNotEmpty } from 'class-validator';
import { Place } from './place.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PlaceCategory extends BaseEntityIncrement {
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  place_category_name: string;

  @Column()
  @ApiProperty()
  place_category_name_detail: string;

  @OneToMany(() => Place, (place) => place.placeCategory)
  places: Place[];
}
