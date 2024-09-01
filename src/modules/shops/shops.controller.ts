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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateShopDTO } from './dto/update_shop.dto';
import { Serialize } from 'src/common/decorators';
import { Shop } from './entities/shop.entity';

@ApiTags('shop')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopService: ShopsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create shop' })
  @ApiCreatedResponse({
    description: 'Shop created successfully',
    type: CreateShopDTO,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
  })
  @Post('create')
  @Serialize(Shop)
  async createShop(@Body() createShopDto: CreateShopDTO) {
    return await this.shopService.create(createShopDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch shop by user id' })
  @ApiOkResponse({
    description: 'Shops found',
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Shops not found ' })
  async getShop(@Param('id') id: string) {
    return await this.shopService.getById(id);
  }

  @Delete(':id/:id')
  @ApiOperation({ summary: 'Delete shop by user id' })
  @ApiOkResponse({
    description: 'Shop found',
  })
  @ApiNotFoundResponse({ description: 'Shop not found ' })
  async deleteShop(
    @Param('userId') userId: string,
    @Param('shopId') shopId: string,
  ) {
    return await this.shopService.deleteById(userId, shopId);
  }

  @Patch(':id/:id')
  @ApiOperation({ summary: 'Update shop by user id' })
  @ApiOkResponse({
    description: 'Shop found',
  })
  @ApiNotFoundResponse({ description: 'Shop not found ' })
  async updateShop(
    @Param('userId') userId: string,
    @Param('shopId') shopId: string,
    @Body() updateShopDto: UpdateShopDTO,
  ) {
    return await this.shopService.updateById(userId, shopId, updateShopDto);
  }
}
