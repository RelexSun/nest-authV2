import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { User } from '../auth/entities/user.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, User]), CloudinaryModule],
  providers: [ShopsService, CloudinaryService],
  controllers: [ShopsController],
})
export class ShopsModule {}
