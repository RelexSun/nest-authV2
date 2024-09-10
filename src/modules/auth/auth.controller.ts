import { Body, Controller, Post, Get, Req, Res, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { Response, Request } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Serialize } from 'src/common/decorators';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update_user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create user account' })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
  })
  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: LoginUserDto,
  })
  @ApiNotFoundResponse({ description: 'Login failed' })
  @Post('login')
  async signIn(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(loginUserDto, response);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiOkResponse({
    description: 'Logout successfully',
  })
  @ApiNotFoundResponse({ description: 'Logout failed' })
  @Post('logout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @ApiOperation({ summary: "refresh user's access token" })
  @ApiOkResponse({
    description: 'Refresh Token successfully',
  })
  @ApiNotFoundResponse({ description: 'Refresh Token failed ' })
  @Post('refresh')
  async refreshToken(
    @Body() input: RefreshTokenDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.refreshToken(input, response);
  }

  @ApiOperation({
    summary: 'Get current user information using token in cookies',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiNotFoundResponse({ description: 'Failed' })
  @Get('user')
  @Serialize(User)
  async getUser(@Req() request: Request) {
    return await this.authService.getUser(request);
  }

  @ApiOperation({
    summary: 'Update current user information using token in cookies',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiNotFoundResponse({ description: 'Failed' })
  @Patch('update')
  async updateUser(@Req() request: Request, @Body() body: UpdateUserDto) {
    return this.authService.update(request, body);
  }
}
