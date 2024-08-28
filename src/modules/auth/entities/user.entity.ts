import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/entities';
import { Shop } from 'src/modules/shops/entities/shop.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({
    type: 'varchar',
    length: 225,
  })
  email: string;

  @Expose()
  @Column({
    type: 'varchar',
    length: 225,
    unique: true,
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 225,
  })
  password: string;

  @OneToMany(() => Shop, (shop) => shop.user)
  shops: Shop[];
}
