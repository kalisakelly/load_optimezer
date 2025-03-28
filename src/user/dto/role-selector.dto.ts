import { IsNotEmpty, IsString, IsIn, IsOptional, IsNumber } from 'class-validator';

export class RoleSelectorDto {
  @IsNotEmpty({ message: 'Role cannot be empty' })
  @IsString({ message: 'Role must be a string' })
  @IsIn(['admin', 'user', 'logistics', 'driver'], { 
    message: 'Role must be one of: admin, user, moderator, guest' 
  })
  role: string;

  // Optional: Add pagination parameters
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}