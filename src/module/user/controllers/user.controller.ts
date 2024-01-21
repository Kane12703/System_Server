import { Body, Controller, Post } from '@nestjs/common';
import { AddRoleDTO } from '../dtos';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('role')
  async addRoleUser(@Body() addRole: AddRoleDTO) {
    return await this.userService.addRoleUser(addRole);
  }
}
