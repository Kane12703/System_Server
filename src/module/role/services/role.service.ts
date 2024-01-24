import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AddPermissionDTO, CreateRoleDto, UpdateRoleDto } from '../dtos';
import { RoleRepository } from '../repositories/role.repository';
import { UuidVaidater } from '@/common/validater/uuid.vaidater';
import { PermissionRepository } from '@/module/permission/repositories/permission.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async getAllRoles() {
    try {
      const roles = await this.roleRepository.find();
      if (!roles) throw new BadRequestException('Get all role fail');
      return {
        code: HttpStatus.OK,
        message: 'Get all role success',
        data: roles,
      };
    } catch (error) {
      throw error;
    }
  }

  async getRoleById(id: string) {
    try {
      const role = await this.roleRepository.findRoleById(id);

      if (!role) throw new ForbiddenException('Role is not exists');

      return {
        code: HttpStatus.OK,
        message: 'Get role by id  success',
        data: role,
      };
    } catch (error) {
      throw error;
    }
  }

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const findRole = await this.roleRepository.findOneBy({
        name: createRoleDto.name.toLowerCase(),
      });
      if (findRole) throw new BadRequestException('Role is exists');
      const createRole = await this.roleRepository.create({
        name: createRoleDto.name.toLowerCase(),
        description: createRoleDto.description,
      });
      const role = await this.roleRepository.save(createRole);

      return {
        code: HttpStatus.OK,
        message: 'Create role success',
        data: role,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const findRole = await this.roleRepository.findRoleById(id);
      if (!findRole) throw new BadRequestException('Role is not exists');

      const updateRole = await this.roleRepository.update(id, {
        name: updateRoleDto.name ? updateRoleDto.name.toLowerCase() : undefined,
        description: updateRoleDto.description,
      });

      if (!updateRole) throw new BadRequestException('Update role fail');

      const role = await this.roleRepository.findOne({ where: { id } });
      return {
        code: HttpStatus.OK,
        message: 'Update role success',
        data: role,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteRole(id: string) {
    try {
      const deleteRole = await this.roleRepository.findOne({ where: { id } });
      if (!deleteRole) throw new BadRequestException('Role is not exists');
      await this.roleRepository.softDelete({ id });
      return { code: HttpStatus.OK, message: 'Role deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async addPermissionRole(addPermission: AddPermissionDTO) {
    try {
      const findRole = await this.roleRepository.findRoleById(
        addPermission.role_id,
      );
      if (!findRole) throw new BadRequestException('Role not exists');

      const findPermission = await this.permissionRepository.findPermissionById(
        addPermission.permission_id,
      );
      if (!findPermission)
        throw new BadRequestException('Permission not exists');

      const roleHasPermission = findRole.permissions.some(
        (permission) => permission.id === addPermission.permission_id,
      );
      if (roleHasPermission) {
        throw new BadRequestException('Role already has the role');
      }

      const role = await this.roleRepository.addPermissionRole(addPermission);

      return {
        code: HttpStatus.OK,
        message: 'Success',
        data: role,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deletePermissionRole(deletePermission: AddPermissionDTO) {
    try {
      const findRole = await this.roleRepository.findRoleById(
        deletePermission.role_id,
      );
      if (!findRole) throw new BadRequestException('Role not exists');

      const findPermission = await this.permissionRepository.findPermissionById(
        deletePermission.permission_id,
      );
      if (!findPermission)
        throw new BadRequestException('Permission not exists');

      const roleHasPermission = findRole.permissions.some(
        (permission) => permission.id === deletePermission.permission_id,
      );
      if (!roleHasPermission) {
        throw new BadRequestException('Role not already has the permision');
      }

      await this.roleRepository.deletePermissionRole(deletePermission);

      return {
        code: HttpStatus.OK,
        message: 'Delete Success',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
