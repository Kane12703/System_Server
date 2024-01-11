import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dtos';
import { AuthRepository } from '../repositories/auth.repository';
import { hashPassword } from '@/utils/password';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  async registerUser(user: LoginUserDto) {
    console.log('================>', user);

    const finUser = await this.authRepository.findUserByEmail(user.email);
    console.log(finUser);

    if (finUser) throw new ForbiddenException('Email already exits');

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
}
