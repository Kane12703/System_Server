import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfileDto } from '../dtos/profile.dto';
import { UpdateProfileDto } from '../dtos';

@Injectable()
export class ProfileRepository extends Repository<ProfileEntity> {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {
    super(
      profileRepository.target,
      profileRepository.manager,
      profileRepository.queryRunner,
    );
  }

  async createProfile(profile: ProfileDto) {
    const user = await this.profileRepository
      .createQueryBuilder('profile')
      .insert()
      .into(ProfileEntity)
      .values(profile)
      .execute();
    return user;
  }

  async readUser(userId: string) {
    return await this.profileRepository
      .createQueryBuilder('profile')
      .where('profile.user_uuid= :user_uuid', { user_uuid: userId })
      .getOne();
  }

  async updateProfile(userId: string, profile: UpdateProfileDto) {
    return await this.profileRepository
      .createQueryBuilder()
      .update(ProfileEntity)
      .set(profile)
      .where('user_uuid= :user_uuid', { user_uuid: userId })
      .execute();
  }
}
