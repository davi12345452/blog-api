import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsEmpty()
  @ApiProperty()
  slug: string;
}
