import { Column, Entity, ManyToOne } from 'typeorm';
import { Shop } from 'src/modules/shops/entities/shop.entity';
import { BaseEntity } from 'src/common/entities';
import { TABLE_STATUS } from 'src/common/enums/table-status';

@Entity('tables')
export class Table extends BaseEntity {
  @Column({
    type: 'int',
  })
  number: number;

  @Column({
    type: 'int',
  })
  seatAmount: number;

  @Column({
    type: 'enum',
    enum: TABLE_STATUS,
    default: TABLE_STATUS.AVAILABLE,
  })
  status: TABLE_STATUS;

  @ManyToOne(() => Shop, (shop) => shop.tables, { onDelete: 'CASCADE' })
  shop: Shop;
}
