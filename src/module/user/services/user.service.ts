import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { LoginUserDto } from '@/auth/dtos';
import { hashPassword } from '@/utils/password';
import { AddRoleDTO } from '../dtos';
import { RoleRepository } from '@/module/role/repositories/role.repository';
import { UserEntity } from '../entities/user.entity';
import { UpdatePasswordDto } from '@/auth/dtos/update_password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}
  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async createUser(user: LoginUserDto) {
    const hash = await hashPassword(user.password);

    return await this.userRepository.createUser({
      email: user.email,
      password: hash,
      twoFactorAuthenticationSecret: user.twoFactorAuthenticationSecret,
    });
  }

  async finUserById(id: string) {
    return await this.userRepository.finUserById(id);
  }

  async updatePassword(user: UpdatePasswordDto) {
    return await this.userRepository.updatePassword(user);
  }

  async addRoleUser(addRole: AddRoleDTO) {
    try {
      const findUser = await this.userRepository.finUserById(addRole.user_id);
      if (!findUser) throw new BadRequestException('User not exists');

      const findRole = await this.roleRepository.findRoleById(addRole.role_id);
      if (!findRole) throw new BadRequestException('Role not exists');

      const userHasRole = findUser.roles.some(
        (role) => role.id === addRole.role_id,
      );
      if (userHasRole) {
        throw new BadRequestException('User already has the role');
      }

      const user = await this.userRepository.addRoleUser(addRole);

      return {
        code: HttpStatus.OK,
        message: 'Success',
        data: user,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteRoleUser(deleteRole: AddRoleDTO) {
    try {
      const findUser = await this.userRepository.finUserById(
        deleteRole.user_id,
      );
      if (!findUser) throw new BadRequestException('User not exists');

      const findRole = await this.roleRepository.findRoleById(
        deleteRole.role_id,
      );
      if (!findRole) throw new BadRequestException('Role not exists');

      const userHasRole = findUser.roles.some(
        (role) => role.id === deleteRole.role_id,
      );
      if (!userHasRole) {
        throw new BadRequestException('User already not has the role');
      }
      await this.userRepository.deleteRoleUser(deleteRole);

      return {
        code: HttpStatus.OK,
        message: 'Delete role success',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllUser() {
    const users = await this.userRepository.find({ relations: ['roles'] });
    return {
      code: HttpStatus.OK,
      message: 'Success',
      data: users,
    };
  }
}
