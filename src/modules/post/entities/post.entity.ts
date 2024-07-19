import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsInt, IsPositive, IsString, Max, Min } from 'class-validator';
import { User } from '../../user/entities';
import { Keyword } from '../../keyword/entities';
import { Comment } from '../../comment/entities/comment.entity';
import { Place } from '../../place/entities/place.entity';
import { Image } from './image.entity';

@Entity()
export class Post extends BaseEntityIncrement {
  @ApiProperty({ example: '길가다 알게된 집이에요. 정말 맛있게 먹고 갑니다.', description: '게시글 본문' })
  @Column({ type: 'varchar', length: 1000 })
  @IsString()
  @Expose()
  content: string;

  @ApiProperty({
    example: '2024-07-03T16:49:20.878Z',
    description: '방문일자',
  })
  @IsDate()
  @Expose()
  @Column({ type: 'timestamptz', precision: 6 })
  visitDate: Date;

  @ApiProperty({ example: 2, description: '별점' })
  @Column({ type: 'int' })
  @Min(1)
  @Max(3)
  @IsInt()
  @IsPositive() // 0보다 큰 정수인지 확인
  @Expose()
  rate: number;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @Expose()
  user: User;

  @OneToMany(() => Keyword, (keyword) => keyword.post, {
    cascade: ['insert', 'update', 'soft-remove', 'remove'],
  })
  @Expose()
  keywords: Keyword[];

  @ManyToMany(() => User, (user) => user.likedPosts)
  @Expose()
  likedByUsers: User[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @Expose()
  comments: Comment[];

  @ManyToOne(() => Place, (place) => place.post)
  @Expose()
  place: Place;

  @OneToMany(() => Image, (image) => image.post)
  @Expose()
  image: Image[];
}
