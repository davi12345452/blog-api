import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSwagger {
  @ApiProperty({
    description: 'Title of the error occurred.',
    example: 'Bad Request Exception occurred.',
  })
  title: string;

  @ApiProperty({
    description: 'Details about the error occurred.',
    example: 'Some error occurred.',
  })
  detail: string;

  @ApiProperty({
    description: 'Type of error that can be referenced in another document.',
    example: '{SERVICE}-ERROR-01',
  })
  type: string;

  @ApiProperty({
    default: 400,
    description: 'Status code of the response.',
  })
  status: number;

  @ApiProperty({
    description: 'Endpoint where the error occurred.',
    example: '{API DOMAIN}/{SERVICE}/',
  })
  instance: string;

  constructor(title: string, detail: string, type: string, instance: string) {
    this.title = title;
    this.detail = detail;
    this.type = type;
    this.instance = instance;
    this.status = 400; // Definindo o valor padrão
  }
}
