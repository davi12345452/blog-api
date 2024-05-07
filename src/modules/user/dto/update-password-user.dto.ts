import { ApiProperty } from '@nestjs/swagger';
import { Contains, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Current password',
    example: '!CurrentPassword123',
  })
  @IsString()
  actualPassword: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'New password',
    example: '!NewPassword123',
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  @Contains('!@#$%', {
    message: 'Password must contain at least one special caracter (!@#$%)',
  })
  newPassword: string;
}
