import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDTO } from './dto/create_shop.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateShopDTO } from './dto/update_shop.dto';

@ApiTags('shop')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopService: ShopsService) {}

  @Post('create')
  async createShop(@Body() createShopDto: CreateShopDTO) {
    return await this.shopService.create(createShopDto);
  }

  @Get(':id')
  async getShop(@Param('id') id: string) {
    return await this.shopService.getById(id);
  }

  @Delete(':id/:id')
  async deleteShop(
    @Param('userId') userId: string,
    @Param('shopId') shopId: string,
  ) {
    return await this.shopService.deleteById(userId, shopId);
  }

  @Patch(':id/:id')
  async updateShop(
    @Param('userId') userId: string,
    @Param('shopId') shopId: string,
    @Body() updateShopDto: UpdateShopDTO,
  ) {
    return await this.shopService.updateById(userId, shopId, updateShopDto);
  }
}
