import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestSwagger } from 'src/swagger/helpers/BadRequestError';

/***
 * LISTA DE ERROS NO USER SERVICE (USER_ERROR-{}):
 * - 01: Email que se tenta cadastrar já está em uso
 */
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (user) {
      const messageError = new BadRequestSwagger(
        'Email already in user',
        'The email passed to create account has already in use',
        'USER_ERROR-01',
        'POST {api_domain}/user/',
      );
      throw new BadRequestException(messageError);
    }
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action ${updateUserDto} updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
