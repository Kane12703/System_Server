import { Base } from '@/core/base/base_entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusUser } from '../enums';
import { Expose, plainToClass } from 'class-transformer';
import { ProfileEntity } from '@/module/profile/entities/profile.entity';
import { RoleEntity } from '@/module/role/entities/role.entity';

@Entity({
  name: 'user',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class UserEntity extends Base {
  @Expose()
  @Column({ type: 'varchar', length: 225, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 225, nullable: false, select: false })
  password: string;

  @Expose()
  @Column({ type: 'enum', enum: StatusUser, default: StatusUser.INACTIVE })
  status: StatusUser;

  @OneToOne(() => ProfileEntity, (proflie) => proflie.user) // specify inverse side as a second parameter
  profile: ProfileEntity;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  constructor(user: Partial<UserEntity>) {
    super(); // call constructor of BaseEntity
    if (user) {
      Object.assign(
        this,
        plainToClass(UserEntity, user, { excludeExtraneousValues: true }),
      );
      this.id = user.id;
    }
  }
}