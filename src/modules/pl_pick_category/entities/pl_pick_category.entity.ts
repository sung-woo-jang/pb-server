import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PlacePlPickCategoryPivot } from './place_pl_pick_category_pivot.entity';
import { User } from '../../user/entities';
import { ApiProperty } from '@nestjs/swagger';
export enum CircleColors {
  RED = '#FF596D',
  ORANGE = '#FE8803',
  YELLOW = '#FEC802',
  GREEN = '#8EC049',
  TEAL = '#41A37C',
  CYAN = '#00C6D8',
  PINK = '#E255A9',
  LIGHT_PINK = '#FF98A0',
  LAVENDER = '#8A94BE',
  BLUE = '#4496E2',
  NAVY = '#005188',
  GRAY = '#767676',
  LIGHT_GRAY = '#BBC3CF',
}
@Entity()
export class PlPickCategory extends BaseEntityIncrement {
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @Column({ type: 'enum', enum: CircleColors, default: CircleColors.RED })
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CircleColors)
  picker_color: CircleColors;

  @Column()
  @ApiProperty()
  memo: string;

  @Column()
  @ApiProperty()
  link: string;

  @OneToMany(() => PlacePlPickCategoryPivot, (pivot) => pivot.plPickCategory)
  placePlPickCategoryPivots: PlacePlPickCategoryPivot[];

  @ManyToOne(() => User, (user) => user.plPickCategories)
  @JoinColumn({ name: 'account' })
  user: User;
}
