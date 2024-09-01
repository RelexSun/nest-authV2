import { User } from 'src/modules/auth/entities/user.entity';
import { BaseEntity } from 'src/common/entities';

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Table } from 'src/modules/table/entities/table.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('shops')
export class Shop extends BaseEntity {
  @Exclude()
  @ManyToOne(() => User, (user) => user.shops, { onDelete: 'CASCADE' })
  user: User;

  @Expose()
  @Column({
    type: 'varchar',
    length: 225,
  })
  name: string;

  @Expose()
  @Column({
    type: 'varchar',
    length: 225,
  })
  location: string;

  @Expose()
  @OneToMany(() => Table, (table) => table.shop)
  tables: Table[];
}
