import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileDto } from '../dtos/profile.dto';
import { ProfileRepository } from '../repositories/profile.repository';
import { AuthService } from '@/auth';
import { UpdateProfileDto } from '../dtos';
import { UserService } from '@/module/user/services';
import { CloudinaryService } from '@/configs/cloudinary/cloudinary.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createUser(
    profile: ProfileDto,
    userId: string,
    image: Express.Multer.File,
  ) {
    const findUser = await this.userService.finUserById(userId);

    if (!findUser) throw new BadRequestException('User not exists');

    const findProfile = await this.profileRepository.readUser(userId);

    if (findProfile) throw new BadRequestException('Profile is exists');

    const image_upload = await this.cloudinaryService.uploadFile(image);

    await this.profileRepository.createProfile({
      address: profile.address,
      city: profile.city,
      country: profile.country,
      zipcode: profile.zipcode,
      firstName: profile.firstName,
      image_url: image_upload.url,
      lastName: profile.lastName,
      phone: profile.phone,
      state: profile.state,
      public_id: image_upload.public_id,
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

  async updateUser(
    userId: string,
    profile: UpdateProfileDto,
    image: Express.Multer.File,
  ) {
    const findProfile = await this.profileRepository.readUser(userId);

    if (!findProfile) throw new BadRequestException('Profile is not exists');

    if (image) {
      const delete_image = await this.cloudinaryService.deleteFileImage(
        findProfile.public_id,
      );
      if (!delete_image)
        throw new BadRequestException('Delete image  profile fail!!');

      const image_upload = await this.cloudinaryService.uploadFile(image);

      if (!image_upload)
        throw new BadRequestException('Upload image  profile fail!!');

      await this.profileRepository.updateProfile(userId, {
        address: profile.address,
        city: profile.city,
        country: profile.country,
        zipcode: profile.zipcode,
        firstName: profile.firstName,
        image_url: image_upload.url,
        lastName: profile.lastName,
        phone: profile.phone,
        state: profile.state,
        public_id: image_upload.public_id,
      });
    } else {
      await this.profileRepository.updateProfile(userId, profile);
    }
    const user = await this.profileRepository.readUser(userId);
    return {
      code: 200,
      message: 'Update user by id success',
      data: user,
    };
  }
}
