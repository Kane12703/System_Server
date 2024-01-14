import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileDto } from '../dtos/profile.dto';
import { ProfileRepository } from '../repositories/profile.repository';
import { AuthService } from '@/auth';
import { UpdateProfileDto } from '../dtos';
import { UserService } from '@/module/user/services';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userService: UserService,
  ) {}

  async createUser(profile: ProfileDto, userId: string) {
    const findUser = await this.userService.finUserById(userId);

    if (!findUser) throw new BadRequestException('User not exists');

    const findProfile = await this.profileRepository.readUser(userId);

    if (findProfile) throw new BadRequestException('Profile is exists');

    await this.profileRepository.createProfile({
      address: profile.address,
      city: profile.city,
      country: profile.country,
      zipcode: profile.zipcode,
      firstName: profile.firstName,
      image_url: profile.image_url,
      lastName: profile.lastName,
      phone: profile.phone,
      state: profile.state,
      user: findUser,
    });

    const user = await this.profileRepository.readUser(userId);

    return {
      code: 200,
      message: 'Create profile success',
      data: user,
    };
  }

  async getUser(userId: string) {
    const user = await this.profileRepository.readUser(userId);

    return {
      code: 200,
      message: 'Get user by id success',
      data: user,
    };
  }

  async updateUser(userId: string, profile: UpdateProfileDto) {
    const findProfile = await this.profileRepository.readUser(userId);

    if (!findProfile) throw new BadRequestException('Profile is not exists');
    await this.profileRepository.updateProfile(userId, profile);
    const user = await this.profileRepository.readUser(userId);
    return {
      code: 200,
      message: 'Update user by id success',
      data: user,
    };
  }
}
