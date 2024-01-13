import { UserEntity } from '@/module/user/entities/user.entity';
import { IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipcode: string;

  @IsString()
  country: string;

  @IsString()
  image_url: string;

  user: UserEntity;
}
