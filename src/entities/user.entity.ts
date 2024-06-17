import { Entity, Column } from 'typeorm';
import { BaseEntityVarchar } from '@common/entities/base.entity';

@Entity()
export class User extends BaseEntityVarchar {
  // @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  // @PrimaryColumn({ type: 'varchar', length: 255 })
  // id: string; // Oauth id

  @Column({ type: 'varchar', length: 7 })
  ageRange: string;

  @Column({ type: 'varchar', length: 5 })
  birthday: string;

  @Column({ type: 'varchar', length: 4 })
  birthyear: string;

  @Column({ type: 'char', length: 1, comment: 'M | W' })
  gender: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string; // 이메일은 무조건 한번만 가입가능하게

  @Column({ type: 'varchar', length: 13, nullable: true })
  mobile: string;

  @Column({
    type: 'varchar',
    length: 15,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  nickname: string;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  profileImage: string;
}
