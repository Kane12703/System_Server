import { Base } from '@/core/base/base_entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { RoleEntity } from '@/module/role/entities/role.entity';

@Entity({
  name: 'user',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class PermissionEntity extends Base {
  @Expose()
  @Column({ type: 'varchar' })
  name: string;

  @Expose()
  @Column({ type: 'varchar' })
  description: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  constructor(permission: Partial<PermissionEntity>) {
    super(); // call constructor of BaseEntity
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
