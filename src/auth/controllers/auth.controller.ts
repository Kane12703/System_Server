import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginUserDto } from '../dtos/login.dto';
import { AuthService } from '../services';
import { RefreshTokenGuard } from '@/common';
import { Request } from 'express';
import { GetUser } from '@/common/decorators';

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
  @UseGuards(RefreshTokenGuard)
  @Get('refresh_token')
  async refreshToken(@GetUser('username') email: string) {
    return this.authService.refresh_token(email);
  }
}
