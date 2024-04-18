import { ApiProperty } from '@nestjs/swagger';
import {
  Contains,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user name to register',
    example: 'User Davi',
  })
  @IsString()
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The user email to register',
    example: 'userdavi@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The user password to register',
    example: '!Password1',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  @Contains('!@#$%', {
    message: 'Password must contain at least one special caracter (!@#$%)',
  })
  @IsString()
  password: string;
}
