import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileDto } from '../dtos/profile.dto';
import { ProfileService } from '../services/profile.service';
import { AccessTokenStrategy } from '@/auth/strategies';
import { GetUser } from '@/common/decorators';
import { AccessTokenGuard } from '@/common';
import { UpdateProfileDto } from '../dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '@/configs/cloudinary/cloudinary.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AccessTokenGuard)
  @Post('')
  async createUser(
    @Body() profile: ProfileDto,
    @GetUser('sub') userId: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('Missing image file !!');
    }
    return await this.profileService.createUser(profile, userId, image);
  }

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AccessTokenGuard)
  @Put('')
  async updateUser(
    @GetUser('sub') userId: string,
    @Body() profile: UpdateProfileDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.profileService.updateUser(userId, profile, image);
  }

  @UseGuards(AccessTokenGuard)
  @Get('')
  async getUser(@GetUser('sub') userId: string) {
    return this.profileService.getUser(userId);
  }
}
