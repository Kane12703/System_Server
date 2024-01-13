import { Base } from '@/common';
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
    created_at: 'DESC',
  },
})
export class ProfileEntity extends Base {
  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'id' })
  user: UserEntity;

  @Column({ type: 'varchar', length: 225, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  zipcode: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  country: string;

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
