import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the article.',
    example: 'Introduction to NestJS',
  })
  @IsString()
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The content of the article.',
    example:
      'NestJS is a powerful framework for building scalable applications in Node.js.',
  })
  @IsString()
  content: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The UUID of the category to which the article belongs.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsUUID()
  category_id: string;
}
