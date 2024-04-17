import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenRequestSwagger {
  @ApiProperty({
    description: 'Title of the error occurred.',
    example: 'Forbidden Exception occurred.',
  })
  title: string;

  @ApiProperty({
    description: 'Details about the error occurred.',
    example: 'Some error occurred.',
  })
  detail: string;

  @ApiProperty({
    description: 'Type of error that can be referenced in another document.',
    example: 'ANSWER-ERROR-01',
  })
  type: string;

  @ApiProperty({
    default: 403,
    description: 'Status code of the response.',
  })
  status: number;

  @ApiProperty({
    description: 'Endpoint where the error occurred.',
    example: 'api/answer/:id',
  })
  instance: string;

  constructor(title: string, detail: string, type: string, instance: string) {
    this.title = title;
    this.detail = detail;
    this.type = type;
    this.instance = instance;
    this.status = 403; // Definindo o valor padrão
  }
}
