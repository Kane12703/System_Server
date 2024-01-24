import { LoginUserDto } from '@/auth/dtos';
import { UserEntity } from '@/module/user/entities/user.entity';
import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddRoleDTO } from '../dtos';

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
      .leftJoinAndSelect('user.roles', 'roles')
      .select(['user', 'roles.name', 'roles.id'])
      .where('user.email = :email', { email })
      .getOne();
  }

  async finUserById(id: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.id = :id', { id })
      .getOne();
  }

  async updatePassword(user: LoginUserDto) {
    return await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ password: user.password })
      .where('email= :email', { email: user.email })
      .execute();
  }

  async addRoleUser(addRole: AddRoleDTO) {
    await this.userRepository
      .createQueryBuilder()
      .relation(UserEntity, 'roles')
      .of({ id: addRole.user_id })
      .add({ id: addRole.role_id });
    return this.finUserById(addRole.user_id);
  }

  async deleteRoleUser(deleteRole: AddRoleDTO) {
    return await this.userRepository
      .createQueryBuilder()
      .relation(UserEntity, 'roles')
      .of({ id: deleteRole.user_id })
      .remove({ id: deleteRole.role_id });
  }
}
