import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '../dtos';
import { AccessTokenGuard, RolesGuard } from '@/common';
import { RoleService } from '../services/role.service';
import { IsUUID } from 'class-validator';
import { UuidVaidater } from '@/common/validater/uuid.vaidater';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enum';
@UseGuards(AccessTokenGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getAllRoles() {
    return this.roleService.getAllRoles();
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  async getRoleById(@Param('id') id: string) {
    UuidVaidater(id);
    return this.roleService.getRoleById(id);
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    UuidVaidater(id);
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    UuidVaidater(id);
    return this.roleService.deleteRole(id);
  }
}
