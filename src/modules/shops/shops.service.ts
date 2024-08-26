import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShopDTO } from './dto/create_shop.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(params: CreateShopDTO): Promise<Shop> {
    const { user_id } = params;
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    const newShop = new Shop(params);
    return this.shopRepository.save(newShop);
  }
}
