import { ApiTags } from '@nestjs/swagger';
import { CreateTableDTO } from './dto/create_table.dto';
import { UpdateTableDTO } from './dto/update_table.dto';
import { TableService } from './table.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateStatusDTO } from './dto/update_status.dto';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('create')
  async create(@Body() body: CreateTableDTO) {
    return await this.tableService.createTable(body);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.tableService.getById(id);
  }

  @Delete(':shop_id/:table_id')
  async delete(
    @Param('shop_id') shop_id: string,
    @Param('table_id') table_id: string,
  ) {
    return await this.tableService.deleteById(shop_id, table_id);
  }

  @Patch(':shop_id/:table_id')
  async update(
    @Param('shop_id') shop_id: string,
    @Param('table_id') table_id: string,
    @Body() body: UpdateTableDTO,
  ) {
    return await this.tableService.updateTable(shop_id, table_id, body);
  }

  @Patch('status/:shop_id/:table_id')
  async status(
    @Param('shop_id') shop_id: string,
    @Param('table_id') table_id: string,
    @Body() body: UpdateStatusDTO,
  ) {
    return await this.tableService.updateStatus(shop_id, table_id, body);
  }
}
