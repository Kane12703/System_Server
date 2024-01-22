import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UuidVaidater } from '@/common/validater/uuid.vaidater';
import { PermissionEntity } from '../entities/permission.entity';
import { CreatePermissionDto, UpdatePermissionDto } from '../dtos';

@Injectable()
export class PermissionRepository extends Repository<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
  ) {
    super(
      permissionRepository.target,
      permissionRepository.manager,
      permissionRepository.queryRunner,
    );
  }
  async findPermission(createPermissionDto: CreatePermissionDto) {
    return await this.permissionRepository.findOneBy({
      name: createPermissionDto.name,
    });
  }

  async findPermissionById(id: string) {
    return await this.permissionRepository.findOne({
      where: { id },
    });
  }

  async createPermission(createPermissionDto: CreatePermissionDto) {
    const permission =
      await this.permissionRepository.create(createPermissionDto);

    return await this.permissionRepository.save(permission);
  }

  async updatePermission(id: string, updatePermissionDto: UpdatePermissionDto) {
    await this.permissionRepository.update(id, updatePermissionDto);
    return await this.findPermissionById(id);
  }

  async deletePermission(id: string) {
    return await this.permissionRepository.softDelete({ id });
  }
}
