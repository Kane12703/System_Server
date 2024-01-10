import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return {
      messeage: 'Success',
      data: loginDto,
    };
  }

  @Post('register')
  async register(@Body() loginDto: LoginUserDto) {
    return {
      messeage: 'Success',
      data: loginDto,
      code: 200,
    };
  }
}
