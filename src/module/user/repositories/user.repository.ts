import { LoginUserDto } from '@/auth/dtos';
import { UserEntity } from '@/module/user/entities/user.entity';
import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async createUser(user: LoginUserDto) {
    return await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .into(UserEntity)
      .values(user)
      .execute();
  }

  async findUserByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  async finUserById(id: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }
}
