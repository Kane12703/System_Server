import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDto } from '../dtos/login.dto';
import { AuthService } from '../services';
import { AccessTokenGuard, RefreshTokenGuard } from '@/common';
import { Request } from 'express';
import { GetUser } from '@/common/decorators';
import { ChangePasswordDTO } from '../dtos';
import { TwoFactorAuthenticationService } from '../services/twoFactorAuthentication.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
  ) {}
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return await this.authService.loginUser(loginDto);
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
  @UseGuards(AccessTokenGuard)
  @Post('send_otp_2fa')
  async sendOtp(@GetUser('sub') id: string) {
    return this.authService.sendOtptwoFactorAuthentication(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('verify_otp')
  async verifyOtp(
    @GetUser('sub') id: string,
    @Body() @Body() payload: { code: string },
  ) {
    return this.authService.verifyOtptwoFactorAuthentication(id, payload.code);
  }
}
