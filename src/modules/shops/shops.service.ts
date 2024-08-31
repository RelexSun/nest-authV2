import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShopDTO } from './dto/create_shop.dto';
import { User } from '../auth/entities/user.entity';
import { UpdateShopDTO } from './dto/update_shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(body: CreateShopDTO): Promise<Shop> {
    const { user_id, name, location, table } = body;

    const user = await this.userRepository.findOne({
      where: { id: user_id },
      relations: ['shops'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    const newShop = this.shopRepository.create({
      user,
      name,
      location,
      table,
    });

    return await this.shopRepository.save(newShop);
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['shops'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async deleteById(userId: string, shopId: string): Promise<Shop> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['shops'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const shop = await this.shopRepository.findOne({
      where: { id: shopId },
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${shopId} not found`);
    }

    return await this.shopRepository.remove(shop);
  }

  async updateById(
    userId: string,
    shopId: string,
    body: UpdateShopDTO,
  ): Promise<Shop> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['shops'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const shop = await this.shopRepository.findOne({
      where: { id: shopId },
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${shopId} not found`);
    }

    const { name, location, table } = body;

    if (!name && !location && table === undefined) {
      throw new BadRequestException('No fields provided to update.');
    }
    await this.shopRepository.update(shop.id, { name, location, table });
    return await this.shopRepository.findOne({
      where: { id: shopId },
    });
  }
}
