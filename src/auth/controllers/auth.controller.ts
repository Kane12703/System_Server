import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginUserDto } from '../dtos/login.dto';
import { AuthService } from '../services';
import { RefreshTokenGuard } from '@/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.loginUser(loginDto);
  }

  @Post('register')
  async register(@Req() req: Request, @Body() loginDto: LoginUserDto) {
    return this.authService.registerUser(loginDto);
  }
}
