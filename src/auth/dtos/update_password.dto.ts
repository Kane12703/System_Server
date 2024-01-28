import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString({})
  @IsNotEmpty()
  password: string;
}
