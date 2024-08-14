import { Expose } from 'class-transformer';
import {
  BaseEntity as _BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity extends _BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @Expose()
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
