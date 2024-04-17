import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class ArticleEntity implements Article {
  @ApiProperty({
    description: 'Database ID of the article.',
    example: 'a270a9a1-fab7-4924-b958-1d432c03619f',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Title of the article',
    example: 'This is an Article Title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Slug of the title article',
    example: 'this-is-an-article-title',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Content of the article.',
    example: 'This is an article',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'ID of the category of article pertences.',
    example: '27337c64-b051-42ab-81c8-3232bc93be6e',
  })
  @IsString()
  @IsUUID()
  category_id: string;

  @ApiProperty({
    description: 'ID of user who created the article',
    example: '27337c64-b051-42ab-81c8-3232bc93be6e',
  })
  @IsString()
  @IsUUID()
  user_id: string;

  @ApiProperty({
    description: 'Date of answer creation.',
    example: '2023-04-17T17:42:57.303Z',
  })
  @IsDateString()
  created_at: Date;

  @ApiProperty({
    description: 'Date of last article update.',
    example: '2023-09-17T17:42:57.303Z',
  })
  @IsDateString()
  updated_at: Date;
}
