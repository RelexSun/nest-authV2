import { User } from 'src/modules/auth/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shops')
export class Shop {
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(shop: Partial<Shop>) {
    Object.assign(this, shop);
  }
}
