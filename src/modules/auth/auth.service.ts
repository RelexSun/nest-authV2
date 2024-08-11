import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { LoginUserDto } from './dto/login_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtPayload } from './interface/jwt-payload';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(params: CreateUserDto): Promise<User> {
    const { email, password } = params;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) throw new BadRequestException('User already exist!');

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.userRepository.save({
      ...params,
      password: hashedPassword,
    });

    return user;
  }

  async login(params: LoginUserDto, response: Response) {
    const { email, password } = params;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (!existingUser) throw new BadRequestException('Please register');

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Incorrect password');

    const accessToken = await this.jwtService.signAsync(
      {
        sub: existingUser.id,
      },
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        ),
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: existingUser.id,
      },
      {
        expiresIn: '7d',
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_TOKEN_SECRET',
        ),
      },
    );

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
    });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
    });

    return { accessToken, refreshToken };
  }

  async logout(response: Response) {
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
    return { message: 'success' };
  }

  async refreshToken(input: RefreshTokenDto, response: Response) {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(
      input.refreshToken,
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_TOKEN_SECRET',
        ),
      },
    );

    const accessToken = await this.jwtService.signAsync(
      {
        sub: payload.sub,
      },
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        ),
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: payload.sub,
      },
      {
        expiresIn: '7d',
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_TOKEN_SECRET',
        ),
      },
    );

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
    });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
    });

    return { accessToken, refreshToken };
  }

  async getUser(request: Request) {
    try {
      const cookie = request.cookies['accessToken'];
      const payload = await this.jwtService.verifyAsync<JwtPayload>(cookie, {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        ),
      });
      if (!payload) throw new UnauthorizedException();

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      return instanceToPlain(user);
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException();
    }
  }
}
