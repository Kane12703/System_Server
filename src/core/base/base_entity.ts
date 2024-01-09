import { Expose } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export class Base extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Expose()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Expose()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Expose()
  @DeleteDateColumn({ type: 'timestamp', select: false })
  deleted_at: Date;

  constructor() {
    super();
  }
}
