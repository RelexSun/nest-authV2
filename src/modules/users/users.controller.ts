import { Serialize } from 'src/common/decorators';
import { UsersService } from './users.service';
import { Controller, Get } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Serialize(User)
  async getUsers() {
    return this.usersService.getService();
  }
}
