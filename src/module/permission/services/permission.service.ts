import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from '../dtos';
import { PermissionRepository } from '../repositories/permission.repository';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async createPermission(createPermissionDto: CreatePermissionDto) {
    try {
      const findPer = await this.permissionRepository.findPermission({
        name: createPermissionDto.name.toLowerCase(),
        description: createPermissionDto.description,
      });
      if (findPer) throw new BadRequestException('Permission is exists');

      const createPermission = await this.permissionRepository.createPermission(
        {
          name: createPermissionDto.name.toLowerCase(),
          description: createPermissionDto.description,
        },
      );

      return {
        code: HttpStatus.OK,
        message: 'Create Permission success',
        data: createPermission,
      };
    } catch (error) {
      throw error;
    }
  }

  async getPermissionId(id: string) {
    try {
      const permission = await this.permissionRepository.findPermissionById(id);

      if (!permission)
        throw new BadRequestException('Permission is not exists');

      return {
        code: HttpStatus.OK,
        message: 'Get permission by id  success',
        data: permission,
      };
    } catch (error) {
      throw error;
    }
  }

  async updatePermission(id: string, updatePermissionDto: UpdatePermissionDto) {
    try {
      const findPermission =
        await this.permissionRepository.findPermissionById(id);
      if (!findPermission)
        throw new BadRequestException('Permission is not exists');

      const updatePermission = await this.permissionRepository.updatePermission(
        id,
        {
          name: updatePermissionDto.name,
          description: updatePermissionDto.description,
        },
      );

      if (!updatePermission)
        throw new BadRequestException('Update permission fail');

      return {
        code: HttpStatus.OK,
        message: 'Update role success',
        data: updatePermission,
      };
    } catch (error) {
      throw error;
    }
  }

  async deletePermission(id: string) {
    try {
      const deletePermission =
        await this.permissionRepository.findPermissionById(id);
      if (!deletePermission)
        throw new BadRequestException('Permission is not exists');
      await this.permissionRepository.deletePermission(id);
      return {
        code: HttpStatus.OK,
        message: 'Permission deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllPermission() {
    try {
      const permissions = await this.permissionRepository.find();
      return {
        code: HttpStatus.OK,
        message: 'Get All Permission successfully',
        data: permissions,
      };
    } catch (error) {
      throw error;
    }
  }
}
