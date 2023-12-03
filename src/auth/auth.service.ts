import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<User> {
    const salt = await genSalt();
    dto.password = await hash(dto.password, salt);
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...dto,
        },
      });
      delete user.password;
      return user;
    } catch {
      throw new BadRequestException('このユーザー名は既に登録されています');
    }
  }
  async signIn(dto: CredentialsDto): Promise<{ accessToken: string }> {
    const { name, password } = dto;
    const user = await this.prismaService.user.findUnique({
      where: {
        name,
      },
    });
    if (user && (await compare(password, user.password))) {
      const payload = { id: user.id, name: user.name, status: user.status };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException(
      'ユーザー名又はパスワードを確認してください',
    );
  }
}
