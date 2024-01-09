import { Base } from '@/core/base/base_entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusUser } from '../enums';

@Entity({
  name: 'user',
})
export class UserEnity extends Base {
  @Column({ type: 'varchar', length: 225, nullable: false, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 225, nullable: false, select: false })
  password: string;
  @Column({ type: 'enum', enum: StatusUser, default: StatusUser.INACTIVE })
  status: StatusUser;
}
