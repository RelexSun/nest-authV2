import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ShopsModule } from './modules/shops/shops.module';
import { TableModule } from './modules/table/table.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule, ShopsModule, TableModule],
})
export class AppModule {}
