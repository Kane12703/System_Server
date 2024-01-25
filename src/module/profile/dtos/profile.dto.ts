import { UserEntity } from '@/module/user/entities/user.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  image_url: string;

  public_id: string;

  user: UserEntity;
}
