import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() dto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(dto);
  }

  @Post('signin')
  async signIn(@Body() dto: CredentialsDto): Promise<{ accessToken: string }> {
    return await this.authService.signIn(dto);
  }
}
