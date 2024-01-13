import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ProfileDto } from '../dtos/profile.dto';
import { ProfileService } from '../services/profile.service';
import { AccessTokenStrategy } from '@/auth/strategies';
import { GetUser } from '@/common/decorators';
import { AccessTokenGuard } from '@/common';
import { UpdateProfileDto } from '../dtos';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @UseGuards(AccessTokenGuard)
  @Post('')
  async createUser(
    @Body() profile: ProfileDto,
    @GetUser('sub') userId: string,
  ) {
    return await this.profileService.createUser(profile, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('')
  async getUser(@GetUser('sub') userId: string) {
    return this.profileService.getUser(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Put('')
  async updateUser(
    @GetUser('sub') userId: string,
    @Body() profile: UpdateProfileDto,
  ) {
    return this.profileService.updateUser(userId, profile);
  }
}
