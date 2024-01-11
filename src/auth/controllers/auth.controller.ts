import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../dtos/login.dto';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return {
      messeage: 'Success',
      data: loginDto,
    };
  }

  @Post('register')
  async register(@Body() loginDto: LoginUserDto) {
    return this.authService.registerUser(loginDto);
  }
}
