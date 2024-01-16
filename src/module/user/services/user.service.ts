import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { LoginUserDto } from '@/auth/dtos';
import { hashPassword } from '@/utils/password';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async createUser(user: LoginUserDto) {
    const hash = await hashPassword(user.password);

    return await this.userRepository.createUser({
      email: user.email,
      password: hash,
    });
  }

  async finUserById(id: string) {
    const user = await this.userRepository.finUserById(id);
    return user;
  }
}
