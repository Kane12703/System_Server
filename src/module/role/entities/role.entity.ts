import { Base } from '@/common';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { PermissionEntity } from '@/module/permission/entities/permission.entity';
import { UserEntity } from '@/module/user/entities/user.entity';

@Entity({
  name: 'role',
  orderBy: {
    created_at: 'DESC',
  },
})
export class RoleEntity extends Base {
  @Expose()
  @Column({ type: 'varchar' })
  name: string;

  @Expose()
  @Column({ type: 'varchar' })
  description: string;

  @ManyToMany(() => UserEntity)
  users: UserEntity[];

  @ManyToMany(() => PermissionEntity)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionEntity[];

  constructor(role: Partial<RoleEntity>) {
    super(); // call constructor of BaseEntity
    if (role) {
      Object.assign(
        this,
        plainToClass(RoleEntity, role, { excludeExtraneousValues: true }),
      );
      this.id = role.id;
    }
  }
}
