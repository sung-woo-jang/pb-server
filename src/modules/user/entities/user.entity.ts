import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityVarchar } from '@common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsString, IsUrl } from 'class-validator';
import { Post } from '../../post/entities';
import { PlPickCategory } from '../../pl_pick_category/entities/pl_pick_category.entity';
import { SearchHistory } from '../../search_history/entities/search_history.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../like/entities/like.entity';

export enum Gender {
  M = 'M',
  W = 'W',
}

@Entity()
export class User extends BaseEntityVarchar {
  @ApiProperty({ example: '20-29', description: '사용자 나이대' })
  @Column({ type: 'varchar', length: 7 })
  @IsString()
  @Expose()
  ageRange: string;

  @ApiProperty({ example: '12-05', description: '사용자 생일' })
  @Column({ type: 'varchar', length: 5 })
  @IsString()
  @Expose()
  birthday: string;

  @ApiProperty({ example: '2000', description: '사용자 생년' })
  @Column({ type: 'varchar', length: 4 })
  @IsString()
  @Expose()
  birthyear: string;

  @ApiProperty({ example: 'M', description: '사용자 성별' })
  @Column({ type: 'char', enum: Gender, length: 1, comment: 'M | W' })
  @IsEnum(Gender)
  @Expose()
  gender: Gender;

  @ApiProperty({ example: 'plavBuds@naver.com', description: '사용자 이메일' })
  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail()
  @Expose()
  email: string; // 이메일은 무조건 한번만 가입가능하게

  @ApiProperty({ example: '010-1234-5678', description: '사용자 휴대폰 번호' })
  @Column({ type: 'varchar', length: 13, nullable: true })
  @IsString()
  @Expose()
  mobile: string;

  @ApiProperty({ example: '홍길동', description: '사용자 이름' })
  @Column({
    type: 'varchar',
    length: 15,
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ example: '동에번쩍', description: '사용자가 네이버에서 설정한 닉네임' })
  @Column({
    type: 'varchar',
    length: 20,
  })
  @IsString()
  @Expose()
  nickname: string;

  @ApiProperty({
    example: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
    description: '사용자가 네이버에서 설정한 이미지 URL',
  })
  @Column({ type: 'varchar', length: 2048, nullable: true })
  @IsUrl()
  @Expose()
  profileImage: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: ['soft-remove', 'remove'] })
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user, { cascade: ['soft-remove', 'remove'] })
  likes: Like[];

  @OneToMany(() => PlPickCategory, (plPickCategories) => plPickCategories.user, { cascade: ['soft-remove', 'remove'] })
  plPickCategories: PlPickCategory[];

  @OneToMany(() => SearchHistory, (searchHistory) => searchHistory.user, { cascade: ['soft-remove', 'remove'] })
  searchHistory: SearchHistory[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: ['soft-remove', 'remove'] })
  comments: Comment[];
}
