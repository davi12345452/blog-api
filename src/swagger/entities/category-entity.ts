import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CategoryEntity implements Category {
  @ApiProperty({
    description: 'Database ID of the category.',
    example: 'a270a9a1-fab7-4924-b958-1d432c03619f',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Name of the category.',
    example: 'Category Name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Slug of the name category.',
    example: 'category-name',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Description of the category.',
    example: 'This is a tech category.',
  })
  @IsString()
  description: string;

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
