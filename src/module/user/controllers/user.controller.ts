import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AddRoleDTO } from '../dtos';
import { UserService } from '../services';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enum';
import { AccessTokenGuard, RolesGuard } from '@/common';
@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Post('role')
  async addRoleUser(@Body() addRole: AddRoleDTO) {
    return await this.userService.addRoleUser(addRole);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }
}
