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
import { AccessTokenGuard } from '@/common';
import { RoleService } from '../services/role.service';

@Controller('role')
@UseGuards(AccessTokenGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  getRoleById(@Param('id') id: string) {
    return this.roleService.getRoleById(id);
  }

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Put(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
