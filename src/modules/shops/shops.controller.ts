import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDTO } from './dto/create_shop.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shop')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopService: ShopsService) {}

  @Post('create')
  async createShop(@Body() createShopDto: CreateShopDTO) {
    return this.shopService.create(createShopDto);
  }

  @Get('create')
  async getShop() {
    return;
  }
}
