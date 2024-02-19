import { Base } from '@/common';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { RoleEntity } from '@/module/role/entities/role.entity';

@Entity({
  name: 'permission',
  orderBy: {
    created_at: 'DESC',
  },
})
export class PermissionEntity extends Base {
  @Expose()
  @Column({ type: 'varchar' })
  name: string;

  @Expose()
  @Column({ type: 'varchar' })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];

  constructor(permission: Partial<PermissionEntity>) {
    super();
    if (permission) {
      Object.assign(
        this,
        plainToClass(PermissionEntity, permission, {
          excludeExtraneousValues: true,
        }),
      );
      this.id = permission.id;
    }
  }
}
