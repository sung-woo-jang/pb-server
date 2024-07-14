import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntityIncrement } from '@common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities';

@Entity()
export class SearchHistory extends BaseEntityIncrement {
  @ApiProperty()
  @Column()
  search_contents: string;

  @ManyToOne(() => User, (user) => user.searchHistory, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}
