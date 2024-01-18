import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDto } from '../dtos/login.dto';
import { AuthService } from '../services';
import { AccessTokenGuard, RefreshTokenGuard } from '@/common';
import { Request } from 'express';
import { GetUser } from '@/common/decorators';
import { ChangePasswordDTO } from '../dtos';

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
  async refreshToken(@GetUser('sub') userId: string) {
    return this.authService.refresh_token(userId);
  }

  @Put('reset_password')
  async resetPassword(@Body() user: LoginUserDto) {
    return this.authService.resetPassword(user);
  }

  @UseGuards(AccessTokenGuard)
  @Post('change_password')
  async changePassword(@Body() user: ChangePasswordDTO) {
    return this.authService.changePassword(user);
  }
}
