import { UserEntity } from '@/module/user/entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
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
