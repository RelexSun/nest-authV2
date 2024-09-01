import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Create table in a shop' })
  @ApiCreatedResponse({
    description: 'Table created successfully',
    type: CreateTableDTO,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
  })
  async create(@Body() body: CreateTableDTO) {
    return await this.tableService.createTable(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch table in a shop by id' })
  @ApiOkResponse({
    description: 'Table found',
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Table not found ' })
  async get(@Param('id') id: string) {
    return await this.tableService.getById(id);
  }

  @Delete(':shop_id/:table_id')
  @ApiOperation({ summary: 'Delete table in a shop by id' })
  @ApiOkResponse({
    description: 'Delete successfully',
  })
  @ApiNotFoundResponse({ description: 'Delete failed' })
  async delete(
    @Param('shop_id') shop_id: string,
    @Param('table_id') table_id: string,
  ) {
    return await this.tableService.deleteById(shop_id, table_id);
  }

  @Patch(':shop_id/:table_id')
  @ApiOperation({ summary: 'Update table in a shop' })
  @ApiOkResponse({
    description: 'Update successfully',
    type: UpdateTableDTO,
  })
  @ApiNotFoundResponse({ description: 'Update failed ' })
  async update(
    @Param('shop_id') shop_id: string,
    @Param('table_id') table_id: string,
    @Body() body: UpdateTableDTO,
  ) {
    return await this.tableService.updateTable(shop_id, table_id, body);
  }

  @Patch('status/:shop_id/:table_id')
  @ApiOperation({ summary: 'Update status of a table' })
  @ApiOkResponse({
    description: 'Update successfully',
    type: UpdateStatusDTO,
  })
  @ApiNotFoundResponse({ description: 'Update failed ' })
  async status(
    @Param('shop_id') shop_id: string,
    @Param('table_id') table_id: string,
    @Body() body: UpdateStatusDTO,
  ) {
    return await this.tableService.updateStatus(shop_id, table_id, body);
  }
}
