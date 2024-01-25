import { UserEntity } from '@/module/user/entities/user.entity';
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  zipcode: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsOptional()
  image_url: string;

  public_id: string;
}
