import {
  BadRequestException,
  Injectable,
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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
        id: existingUser.id,
      },
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        ),
        expiresIn: '60s',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        id: existingUser.id,
      },
      {
        expiresIn: '7d',
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_TOKEN_SECRET',
        ),
      },
    );

    response.cookie('token', accessToken, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
    });

    return { accessToken, refreshToken };
  }

  async logout(response: Response) {
    response.clearCookie('token');
    return { message: 'success' };
  }

  async refreshToken(params: LoginUserDto, response: Response) {
    const { email, password } = params;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (!existingUser) throw new BadRequestException('Please regitser');

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Incorrect password');

    const accessToken = await this.jwtService.signAsync({
      id: existingUser.id,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        id: existingUser.id,
      },
      { expiresIn: '7d' },
    );

    response.cookie('token', accessToken, { httpOnly: true });
    return { refreshToken };
  }

  async getUser(request: Request) {
    try {
      const cookie = request.cookies['token'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) throw new UnauthorizedException();

      const user = await this.userRepository.findOne({
        where: { id: data['id'] },
      });

      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
