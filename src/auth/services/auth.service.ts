import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dtos';
import { AuthRepository } from '../repositories/auth.repository';
import { comparePassword, hashPassword } from '@/utils/password';
import { JWTService } from '@/configs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JWTService,
  ) {}
  async registerUser(user: LoginUserDto) {
    const finUser = await this.authRepository.findUserByEmail(user.email);

    console.log(finUser);

    if (finUser) throw new ForbiddenException('Email already exists');

    const hash = await hashPassword(user.password);

    const createUser = await this.authRepository.createUser({
      email: user.email,
      password: hash,
    });

    if (!createUser) throw new ForbiddenException('Register no succes');

    return {
      message: 'Register success !',
    };
  }

  async loginUser(user: LoginUserDto) {
    const finUser = await this.authRepository.findUserByEmail(user.email);
    if (!finUser) throw new ForbiddenException('Email is not exists');

    const isMatch = await comparePassword(user.password, finUser.password);
    console.log(isMatch);
    if (!isMatch) throw new ForbiddenException('Emaill or Password  is wrong ');

    const tokens = await this.jwtService.getTokens(finUser.id, finUser.email);

    return {
      message: 'Login succes',
      tokens,
    };
  }

  async finUserById(id: string) {
    const user = await this.authRepository.finUserById(id);
    return user;
  }
}
