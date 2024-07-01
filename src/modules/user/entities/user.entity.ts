import { Entity, Column } from 'typeorm';
import { BaseEntityVarchar } from '@common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity()
export class User extends BaseEntityVarchar {
  // @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  // @PrimaryColumn({ type: 'varchar', length: 255 })
  // id: string; // Oauth id
  @ApiProperty({ example: '20-29', description: '사용자 나이대' })
  @Expose()
  @Column({ type: 'varchar', length: 7 })
  ageRange: string;

  @ApiProperty({ example: '12-05', description: '사용자 생일' })
  @Expose()
  @Column({ type: 'varchar', length: 5 })
  birthday: string;

  @ApiProperty({ example: '2000', description: '사용자 생년' })
  @Expose()
  @Column({ type: 'varchar', length: 4 })
  birthyear: string;

  @ApiProperty({ example: 'M', description: '사용자 성별' })
  @Expose()
  @Column({ type: 'char', length: 1, comment: 'M | W' })
  gender: string;

  @ApiProperty({ example: 'plavBuds@naver.com', description: '사용자 이메일' })
  @Expose()
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string; // 이메일은 무조건 한번만 가입가능하게

  @ApiProperty({ example: '010-1234-5678', description: '사용자 휴대폰 번호' })
  @Expose()
  @Column({ type: 'varchar', length: 13, nullable: true })
  mobile: string;

  @ApiProperty({ example: '홍길동', description: '사용자 이름' })
  @Expose()
  @Column({
    type: 'varchar',
    length: 15,
  })
  name: string;

  @ApiProperty({ example: '동에번쩍', description: '사용자가 네이버에서 설정한 닉네임' })
  @Expose()
  @Column({
    type: 'varchar',
    length: 20,
  })
  nickname: string;

  @ApiProperty({
    example: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
    description: '사용자가 네이버에서 설정한 이미지 URL',
  })
  @Expose()
  @Column({ type: 'varchar', length: 2048, nullable: true })
  profileImage: string;
}
