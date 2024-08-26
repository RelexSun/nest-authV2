import { Body, Controller, Post, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { Response, Request } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Serialize } from 'src/common/decorators';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async signIn(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(loginUserDto, response);
  }

  @Post('logout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @Post('refresh')
  async refreshToken(
    @Body() input: RefreshTokenDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.refreshToken(input, response);
  }

  @Get('user')
  @Serialize(User)
  async getUser(@Req() request: Request) {
    return await this.authService.getUser(request);
  }
}
