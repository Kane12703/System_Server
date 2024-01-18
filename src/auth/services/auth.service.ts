import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ChangePasswordDTO, LoginUserDto } from '../dtos';
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

    if (finUser) throw new BadRequestException('Email already exists');

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Welcome to my website',
      template: './wellcome',
      context: {
        name: user.email,
      },
    });

    const createUser = await this.userService.createUser(user);

    if (!createUser) throw new BadRequestException('Register no succes');

    return {
      message: 'Register success !',
      code: HttpStatus.OK,
    };
  }

  async loginUser(user: LoginUserDto) {
    const finUser = await this.userService.findUserByEmail(user.email);

    if (!finUser) throw new BadRequestException('Email is not exists');

    const isMatch = await comparePassword(user.password, finUser.password);

    if (!isMatch)
      throw new BadRequestException('Emaill or Password  is wrong ');

    const tokens = await this.jwtService.getTokens(finUser.id, finUser.email);

    return {
      message: 'Login succes',
      tokens,
      code: HttpStatus.OK,
    };
  }

  async refresh_token(userId: string) {
    const finUser = await this.userService.finUserById(userId);
    if (!finUser) throw new ForbiddenException('User is not exists');
    const tokens = await this.jwtService.getTokens(finUser.id, finUser.email);
    return {
      message: 'Get refreshtoken  succes',
      code: HttpStatus.OK,
      tokens,
    };
  }

  async resetPassword(user: LoginUserDto) {
    const finUser = await this.userService.findUserByEmail(user.email);
    if (!finUser) throw new BadRequestException('User is not exists');
    const newPassword = await hashPassword(user.password);

    await this.userService.updatePassword({
      email: user.email,
      password: newPassword,
    });

    return {
      message: 'Reset password success',
      code: HttpStatus.OK,
    };
  }

  async changePassword(user: ChangePasswordDTO) {
    const finUser = await this.userService.findUserByEmail(user.email);
    if (!finUser) throw new BadRequestException('User is not exists');
    const isMatchPassword = await comparePassword(
      user.oldPassword,
      finUser.password,
    );
    if (!isMatchPassword)
      throw new BadRequestException('Old password is wrong');

    const newPassword = await hashPassword(user.newPassword);

    await this.userService.updatePassword({
      email: user.email,
      password: newPassword,
    });

    return {
      message: 'Change password success',
      code: HttpStatus.OK,
    };
  }
}
