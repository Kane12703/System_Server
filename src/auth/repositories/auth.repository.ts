import { UserEntity } from '@/module/user/entities/user.entity';
import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../dtos';

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
  ) {
    super(
      authRepository.target,
      authRepository.manager,
      authRepository.queryRunner,
    );
  }

  async createUser(user: LoginUserDto) {
    return await this.authRepository
      .createQueryBuilder('user')
      .insert()
      .into(UserEntity)
      .values(user)
      .execute();
  }

  async findUserByEmail(email: string) {
    return await this.authRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  async finUserById(id: string) {
    return await this.authRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }
}
