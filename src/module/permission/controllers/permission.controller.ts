import { AccessTokenGuard, Role, RolesGuard } from '@/common';
import { Roles } from '@/common/decorators/roles.decorator';
import { UuidVaidater } from '@/common/validater/uuid.vaidater';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto, UpdatePermissionDto } from '../dtos';

@UseGuards(AccessTokenGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getAllPermission() {
    return this.permissionService.getAllPermission();
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  async getPermissionById(@Param('id') id: string) {
    UuidVaidater(id);
    return this.permissionService.getPermissionId(id);
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionService.createPermission(createPermissionDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Put(':id')
  async updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    UuidVaidater(id);
    return this.permissionService.updatePermission(id, updatePermissionDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deletePermission(@Param('id') id: string) {
    UuidVaidater(id);
    return this.permissionService.deletePermission(id);
  }
}
