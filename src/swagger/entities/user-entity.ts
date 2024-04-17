import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class UserEntity {
  @ApiProperty({
    description: 'Database ID of the user.',
    example: 'a270a9a1-fab7-4924-b958-1d432c03619f',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Name of the user.',
    example: 'User Davi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email of the user.',
    example: 'userdavi@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Type of the user ',
    example: UserType.COMMON,
    enum: UserType,
  })
  @IsString()
  type: UserType;

  @ApiProperty({
    description: 'Date of user creation.',
    example: '2023-04-17T17:42:57.303Z',
  })
  @IsDateString()
  created_at: Date;

  @ApiProperty({
    description: 'Date of last user update.',
    example: '2023-09-17T17:42:57.303Z',
  })
  @IsDateString()
  updated_at: Date;
}
