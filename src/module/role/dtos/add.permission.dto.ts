import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddPermissionDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  role_id: string;
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  permission_id: string;
}
