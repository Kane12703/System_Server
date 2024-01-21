import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '../enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest();

    if (
      !(
        user &&
        requireRoles.some((requiredRole) =>
          user.role.map((userRole) => userRole.name).includes(requiredRole),
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
