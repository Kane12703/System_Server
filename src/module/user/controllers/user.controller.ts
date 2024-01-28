import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AddRoleDTO } from '../dtos';
import { UserService } from '../services';
import { Roles } from '@/common/decorators/roles.decorator';
import { Permission, Role } from '@/common/enum';
import { AccessTokenGuard, Permissions, RolesGuard } from '@/common';
import { PermissionGuard } from '@/common/guard/permission.guard';
@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Roles(Role.ADMIN, Role.MANAGER)
  // @UseGuards(RolesGuard)
  @Post('role')
  async addRoleUser(@Body() addRole: AddRoleDTO) {
    return await this.userService.addRoleUser(addRole);
  }

  @Roles(Role.ADMIN)
  @Permissions(Permission.DELETE)
  @UseGuards(RolesGuard, PermissionGuard)
  @Delete('role')
  async deleteRoleUser(@Body() deleteRole: AddRoleDTO) {
    return await this.userService.deleteRoleUser(deleteRole);
  }

  // @Roles(Role.ADMIN, Role.MANAGER)
  // @UseGuards(RolesGuard)
  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }
}
