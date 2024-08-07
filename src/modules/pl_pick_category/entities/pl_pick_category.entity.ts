import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { IsEnum, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { PlacePick } from '../../place_pick/entities/place_pick.entity';
import { User } from '../../user/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
@Entity({ comment: '플픽 카테고리 테이블' })
export class PlPickCategory extends BaseEntityIncrement {
  @Column({ nullable: false, comment: '플픽 별명' })
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  title: string;

  @Column({ type: 'enum', enum: CircleColors, default: CircleColors.RED, nullable: false, comment: 'picker 색깔' })
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CircleColors)
  @Expose()
  picker_color: CircleColors;

  @Column({ nullable: true, comment: '메모' })
  @ApiProperty({ required: false })
  @IsOptional()
  @Expose()
  memo: string;

  @Column({ nullable: true, comment: '링크' })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  @Expose()
  link: string;

  @OneToMany(() => PlacePick, (placePick) => placePick.plPickCategory)
  placePicks: PlacePick[];

  @ManyToOne(() => User, (user) => user.plPickCategories)
  @JoinColumn({ name: 'account' })
  user: User;
}
