import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '../dtos';
import { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAllRoles() {
    const roles = await this.roleRepository.find();
    if (!roles) throw new BadRequestException('Get all role fail');
    return {
      code: HttpStatus.OK,
      message: 'Get all role success',
      data: roles,
    };
  }

  async getRoleById(id: string) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) throw new ForbiddenException('Role is not exists');

    return {
      code: HttpStatus.OK,
      message: 'Get role by id  success',
      data: role,
    };
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const findRole = await this.roleRepository.findOneBy({
      name: createRoleDto.name.toUpperCase(),
    });
    if (findRole) throw new BadRequestException('Role is exists');
    const createRole = await this.roleRepository.create({
      name: createRoleDto.name.toUpperCase(),
      description: createRoleDto.description,
    });
    const role = await this.roleRepository.save(createRole);

    return {
      code: HttpStatus.OK,
      message: 'Create role success',
      data: role,
    };
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    const findRole = await this.roleRepository.findOne({ where: { id: id } });
    if (!findRole) throw new BadRequestException('Role is not exists');

    const updateRole = await this.roleRepository.update(id, {
      name: updateRoleDto.name.toUpperCase(),
      description: updateRoleDto.description,
    });

    if (!updateRole) throw new BadRequestException('Update role fail');

    const role = await this.roleRepository.findOne({ where: { id } });
    return {
      code: HttpStatus.OK,
      message: 'Update role success',
      data: role,
    };
  }

  async deleteRole(id: string) {
    const deleteRole = await this.roleRepository.findOne({ where: { id } });
    if (!deleteRole) throw new BadRequestException('Role is not exists');
    await this.roleRepository.softDelete({ id });
    return { code: HttpStatus.OK, message: 'Role deleted successfully' };
  }
}
