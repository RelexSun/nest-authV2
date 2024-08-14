import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
