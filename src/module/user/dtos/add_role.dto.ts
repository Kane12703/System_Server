import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddRoleDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  role_id: string;
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  user_id: string;
}
