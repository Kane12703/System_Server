import { IsOptional, IsString } from 'class-validator';

export class UpdatePermissionDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}
