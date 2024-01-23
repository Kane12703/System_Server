import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Permission, Role } from '../enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Permission[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    const { user } = context.switchToHttp().getRequest();
    console.log(user);

    if (
      !(
        user &&
        requireRoles.some((requiredRole) =>
          user.permission
            .map((rolePermission) => rolePermission.name)
            .includes(requiredRole),
        )
      )
    ) {
      throw new UnauthorizedException(
        'You need permission to access this resource',
      );
    }

    return true;
  }
}
