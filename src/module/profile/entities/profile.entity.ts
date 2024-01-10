import { Base } from '@/core/base/base_entity';
import { UserEntity } from '@/module/user/entities/user.entity';
import { Expose, plainToClass } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'profile',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class ProfileEntity extends Base {
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'id' })
  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;

  @Expose()
  @Column({ type: 'varchar', length: 225, nullable: true })
  firstName: string;

  @Expose()
  @Column({ type: 'varchar', length: 225, nullable: true })
  lastName: string;

  @Expose()
  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  phone: string;

  @Expose()
  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Expose()
  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Expose()
  @Column({ type: 'varchar', nullable: true })
  state: string;

  @Expose()
  @Column({ type: 'varchar', length: 10, nullable: true })
  zipcode: string;

  @Expose()
  @Column({ type: 'varchar', length: 10, nullable: true })
  country: string;

  @Expose()
  @Column({ type: 'varchar', nullable: true })
  image_url: string;

  constructor(profile: Partial<ProfileEntity>) {
    super(); // call constructor of BaseEntity
    if (profile) {
      Object.assign(
        this,
        plainToClass(ProfileEntity, profile, { excludeExtraneousValues: true }),
      );
      this.id = profile.id;
    }
  }
}
