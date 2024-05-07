import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the category.',
    example: 'Technology',
  })
  @IsString()
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the category.',
    example: 'Articles related to technology and innovation.',
  })
  @IsString()
  description: string;
}
