import { Column, Entity, ManyToOne } from 'typeorm';
import { Shop } from 'src/modules/shops/entities/shop.entity';
import { BaseEntity } from 'src/common/entities';
import { TABLE_STATUS } from 'src/common/enums/table-status';
import { Exclude, Expose } from 'class-transformer';

@Entity('tables')
export class Table extends BaseEntity {
  @Expose()
  @Column({
    type: 'int',
  })
  number: number;

  @Expose()
  @Column({
    type: 'int',
  })
  seatAmount: number;

  @Expose()
  @Column({
    type: 'enum',
    enum: TABLE_STATUS,
    default: TABLE_STATUS.AVAILABLE,
  })
  status: TABLE_STATUS;

  @Exclude()
  @ManyToOne(() => Shop, (shop) => shop.tables, { onDelete: 'CASCADE' })
  shop: Shop;
}
