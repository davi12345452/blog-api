import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({
    description: 'The user name to register',
    example: 'User Davi',
  })
  @IsString()
  name: string;
}
