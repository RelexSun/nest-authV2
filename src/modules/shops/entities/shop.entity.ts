import { User } from 'src/modules/auth/entities/user.entity';
import { BaseEntity } from 'src/common/entities';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shops')
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.shops, { onDelete: 'CASCADE' })
  @JoinColumn()
  user = User;

  @Column({
    type: 'varchar',
    length: 225,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 225,
  })
  location: string;

  @Column()
  table: number;
}
