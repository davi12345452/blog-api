import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @ApiProperty({
    description: 'The name of the category.',
    example: 'Technology',
  })
  @IsString()
  name: string;

  @IsOptional()
  @ApiProperty({
    description: 'The description of the category.',
    example: 'Articles related to technology and innovation.',
  })
  @IsString()
  description: string;
}
