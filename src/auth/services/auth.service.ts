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
import { RoleRepository } from '@/module/role/repositories/role.repository';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
    private readonly mailService: MailerService,
    private readonly roleRepository: RoleRepository,
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    @InjectQueue('send-mail')
    private sendMail: Queue,
  ) {}
  async registerUser(user: LoginUserDto) {
    try {
      const finUser = await this.userService.findUserByEmail(user.email);

      if (finUser) throw new BadRequestException('Email already exists');

      const secret =
        await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret();

      const createUser = await this.userService.createUser({
        email: user.email,
        password: user.password,
        twoFactorAuthenticationSecret: secret,
      });

      if (!createUser) throw new BadRequestException('Register no succes');

      return {
        message: 'Register success !',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(user: LoginUserDto) {
    try {
      const finUser = await this.userService.findUserByEmail(user.email);

      if (!finUser) throw new BadRequestException('Email is not exists');

      const isMatch = await comparePassword(user.password, finUser.password);

      if (!isMatch)
        throw new BadRequestException('Emaill or Password  is wrong ');

      // Lấy tất cả các roles của người dùng
      const userRoles = finUser.roles || [];

      // Lặp qua từng role và lấy tất cả các permissions của role đó
      const allPermissions = await Promise.all(
        userRoles.map(async (role) => {
          const roleEntity = await this.roleRepository.findRoleById(role.id);
          return roleEntity ? roleEntity.permissions : [];
        }),
      );

      // Flatten mảng 2 chiều thành mảng 1 chiều
      const flattenedPermissions = allPermissions.flat();

      // Loại bỏ các permission trùng lặp (nếu có)
      const uniquePermissions = Array.from(new Set(flattenedPermissions));

      const tokens = await this.jwtService.getTokens(
        finUser.id,
        finUser.email,
        finUser.roles,
        uniquePermissions,
      );

      return {
        code: HttpStatus.OK,
        message: 'Login succes',
        tokens,
      };
    } catch (error) {
      throw error;
    }
  }

  async refresh_token(userId: string) {
    try {
      const finUser = await this.userService.finUserById(userId);
      if (!finUser) throw new ForbiddenException('User is not exists');

      // Lấy tất cả các roles của người dùng
      const userRoles = finUser.roles || [];

      // Lặp qua từng role và lấy tất cả các permissions của role đó
      const allPermissions = await Promise.all(
        userRoles.map(async (role) => {
          const roleEntity = await this.roleRepository.findRoleById(role.id);
          return roleEntity ? roleEntity.permissions : [];
        }),
      );

      // Flatten mảng 2 chiều thành mảng 1 chiều
      const flattenedPermissions = allPermissions.flat();

      // Loại bỏ các permission trùng lặp (nếu có)
      const uniquePermissions = Array.from(new Set(flattenedPermissions));
      const tokens = await this.jwtService.getTokens(
        finUser.id,
        finUser.email,
        finUser.roles,
        uniquePermissions,
      );
      return {
        code: HttpStatus.OK,
        message: 'Get refreshtoken  succes',
        tokens,
      };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(user: LoginUserDto) {
    try {
      const finUser = await this.userService.findUserByEmail(user.email);
      if (!finUser) throw new BadRequestException('User is not exists');
      const newPassword = await hashPassword(user.password);

      await this.userService.updatePassword({
        email: user.email,
        password: newPassword,
      });

      return {
        code: HttpStatus.OK,
        message: 'Reset password success',
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(user: ChangePasswordDTO) {
    try {
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
        code: HttpStatus.OK,
        message: 'Change password success',
      };
    } catch (error) {
      throw error;
    }
  }

  async sendOtptwoFactorAuthentication(id: string) {
    const finUser = await this.userService.finUserById(id);
    if (!finUser) throw new BadRequestException('User is not exists');

    const otp = await this.twoFactorAuthenticationService.sendOtp(
      finUser.twoFactorAuthenticationSecret,
    );

    await this.sendMail.add(
      'send_mail_otp',
      {
        to: finUser.email,
        name: finUser.email,
        code: otp,
        email: finUser.email,
      },
      {
        removeOnComplete: true,
      },
    );

    return {
      message: 'Send otp success',
      code: HttpStatus.OK,
    };
  }

  async verifyOtptwoFactorAuthentication(id: string, code: string) {
    const finUser = await this.userService.finUserById(id);
    if (!finUser) throw new BadRequestException('User is not exists');

    const isVerify =
      await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        code,
        finUser.twoFactorAuthenticationSecret,
      );

    if (!isVerify) throw new BadRequestException('Otp is incorrect!!');

    return {
      message: 'Verify otp success',
      code: HttpStatus.OK,
    };
  }
}
