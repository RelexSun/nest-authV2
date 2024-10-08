import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from '../shops/entities/shop.entity';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { CreateTableDTO } from './dto/create_table.dto';
import { UpdateTableDTO } from './dto/update_table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async createTable(@Body() body: CreateTableDTO): Promise<Table> {
    const { shop_id } = body;
    const shop = await this.shopRepository.findOne({
      where: { id: shop_id },
      relations: ['tables'],
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${shop_id} not found`);
    }

    const table = this.tableRepository.create({
      shop,
      ...body,
    });
    return await this.tableRepository.save(table);
  }

  async getById(id: string): Promise<Table[]> {
    const shop = await this.shopRepository.findOne({
      where: { id },
      relations: ['tables'],
    });

    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }

    return shop.tables;
  }

  async deleteById(shop_id: string, table_id: string): Promise<Table> {
    const shop = await this.shopRepository.findOne({
      where: { id: shop_id },
      relations: ['tables'],
    });

    if (!shop) {
      throw new NotFoundException(`Shop with ID ${shop_id} not found`);
    }

    const table = await this.tableRepository.findOne({
      where: { id: table_id },
    });
    if (!table) {
      throw new NotFoundException(`Table with ID ${table_id} not found`);
    }

    return await this.tableRepository.remove(table);
  }

  async updateTable(
    shop_id: string,
    table_id: string,
    @Body() body: UpdateTableDTO,
  ): Promise<Table> {
    const shop = await this.shopRepository.findOne({
      where: { id: shop_id },
      relations: ['tables'],
    });

    if (!shop) {
      throw new NotFoundException(`Shop with ID ${shop_id} not found`);
    }

    const table = await this.tableRepository.findOne({
      where: { id: table_id },
    });
    if (!table) {
      throw new NotFoundException(`Table with ID ${table_id} not found`);
    }
    await this.tableRepository.update(table.id, { ...body });
    return await this.tableRepository.findOne({ where: { id: table_id } });
  }
}
