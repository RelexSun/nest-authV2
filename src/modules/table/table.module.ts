import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { Table } from './entities/table.entity';
import { Shop } from '../shops/entities/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Table, Shop])],
  providers: [TableService],
  controllers: [TableController],
})
export class TableModule {}
