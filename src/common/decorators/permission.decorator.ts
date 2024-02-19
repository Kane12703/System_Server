import { SetMetadata } from '@nestjs/common';
import { Permission, Role } from '../enum';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata('permissions', permissions);
