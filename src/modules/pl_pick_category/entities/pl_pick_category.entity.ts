import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsEnum, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
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
@Entity({ comment: '플픽 테이블\n플픽 카테고리에 저장될 플픽 정보' })
export class PlPickCategory extends BaseEntityIncrement {
  @Column({ nullable: false, comment: '플픽 별명' })
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  // TODO: 삭제예정
  @Column({ type: 'enum', enum: CircleColors, default: CircleColors.RED, nullable: false, comment: 'picker 색깔' })
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CircleColors)
  picker_color: CircleColors;

  @Column({ nullable: true, comment: '메모' })
  @ApiProperty({ required: false })
  @IsOptional()
  memo: string;

  @Column({ nullable: true, comment: '링크' })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  link: string;

  @OneToMany(() => PlacePlPickCategoryPivot, (pivot) => pivot.plPickCategory)
  placePlPickCategoryPivots: PlacePlPickCategoryPivot[];

  @ManyToOne(() => User, (user) => user.plPickCategories)
  @JoinColumn({ name: 'account' })
  user: User;
}
