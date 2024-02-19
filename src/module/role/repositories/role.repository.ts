import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { UuidVaidater } from '@/common/validater/uuid.vaidater';
import { AddPermissionDTO } from '../dtos';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {
    super(
      roleRepository.target,
      roleRepository.manager,
      roleRepository.queryRunner,
    );
  }

  // async findRoleById(id: string) {
  //   return await this.roleRepository.findOne({
  //     where: { id },
  //     relations: ['permissions'],
  //   });
  // }

  async findRoleById(id: string) {
    return await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .select(['role', 'permissions.name', 'permissions.id'])
      .where('role.id = :id', { id })
      .getOne();
  }

  async addPermissionRole(addPermission: AddPermissionDTO) {
    await this.roleRepository
      .createQueryBuilder()
      .relation(RoleEntity, 'permissions')
      .of({ id: addPermission.role_id })
      .add({ id: addPermission.permission_id });
    return await this.findRoleById(addPermission.role_id);
  }

  async deletePermissionRole(addPermission: AddPermissionDTO) {
    return await this.roleRepository
      .createQueryBuilder()
      .relation(RoleEntity, 'permissions')
      .of({ id: addPermission.role_id })
      .remove({ id: addPermission.permission_id });
  }
}
