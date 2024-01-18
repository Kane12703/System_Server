import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dtos';
import { comparePassword, hashPassword } from '@/utils/password';
import { JWTService } from '@/configs/jwt';
import { UserService } from '@/module/user/services';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
    private readonly mailService: MailerService,
  ) {}
  async registerUser(user: LoginUserDto) {
    const finUser = await this.userService.findUserByEmail(user.email);

    if (finUser) throw new ForbiddenException('Email already exists');

    console.log(user.email)

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Welcome to my website',
      template: './wellcome',
      context: {
        name: user.email
      },
    });

    const createUser = await this.userService.createUser(user);

    if (!createUser) throw new ForbiddenException('Register no succes');

   

    return {
      message: 'Register success !',
    };
  }

  async loginUser(user: LoginUserDto) {
    const finUser = await this.userService.findUserByEmail(user.email);

    if (!finUser) throw new ForbiddenException('Email is not exists');

    const isMatch = await comparePassword(user.password, finUser.password);

    if (!isMatch) throw new ForbiddenException('Emaill or Password  is wrong ');

    const tokens = await this.jwtService.getTokens(finUser.id, finUser.email);

    return {
      message: 'Login succes',
      tokens,
    };
  }

  async refresh_token(email: string) {
    const finUser = await this.userService.findUserByEmail(email);
    if (!finUser) throw new ForbiddenException('Email is not exists');
    const tokens = await this.jwtService.getTokens(finUser.id, finUser.email);
    return {
      message: 'Get refreshtoken  succes',
      code: HttpStatus.OK,
      tokens,
    };
  }
}
