import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: { id: number; name: string }): Promise<User> {
    const { id, name } = payload;
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
        name,
      },
    });
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}

export { JwtStrategy };
