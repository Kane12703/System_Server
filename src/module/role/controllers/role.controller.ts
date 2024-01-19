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
import { IsUUID } from 'class-validator';
import { UuidVaidater } from '@/common/validater/uuid.vaidater';

@Controller('role')
@UseGuards(AccessTokenGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string) {
    UuidVaidater(id);
    return this.roleService.getRoleById(id);
  }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    UuidVaidater(id);
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    UuidVaidater(id);
    return this.roleService.deleteRole(id);
  }
}
