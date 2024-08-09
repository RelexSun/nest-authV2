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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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
      (await existingUser).password,
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

    response.cookie('jwt', accessToken, { httpOnly: true });

    return { accessToken, refreshToken };
  }

  async logout(response: Response) {
    response.clearCookie('jwt');
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
      (await existingUser).password,
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

    response.cookie('jwt', accessToken, { httpOnly: true });
    return { refreshToken };
  }

  async getUser(request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) throw new UnauthorizedException();

      const user = await this.userRepository.findOne({
        where: { id: data['id'] },
      });

      const { password, ...result } = user;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
