import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestSwagger } from 'src/swagger/helpers/BadRequestError';
import { hashSync } from 'bcrypt';
import { Request } from 'express';
import { ForbiddenRequestSwagger } from 'src/swagger/helpers/ForbiddenRequestError';
import { NotFoundRequestSwagger } from 'src/swagger/helpers/NotFoundRequestErrro';

/***
 * LISTA DE ERROS NO USER SERVICE (USER_ERROR-{}):
 * - 01: Email que se tenta cadastrar já está em uso
 * - 02: Um usuário que não é admin tentou acessar a rota para chamar todos o usuários
 */
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email.toLowerCase(),
          password: hashSync(createUserDto.password, 10),
        },
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    } catch (error) {
      if (error.code == 'P2002') {
        const messageError = new BadRequestSwagger(
          'Email already in use',
          'The email passed to create account has already in use',
          'USER_ERROR-01',
          'POST {api_domain}/user/',
        );
        throw new BadRequestException(messageError);
      } else {
        const messageError = new BadRequestSwagger(
          'Some internal error ocurred',
          error.response,
          error.code,
          'POST {api_domain}/user/',
        );
        throw new BadRequestException(messageError);
      }
    }
  }

  async findAll(req: Request) {
    const userFromReq = req['user'];
    if (userFromReq.type != 'ADMIN') {
      const messageError = new ForbiddenRequestSwagger(
        'Only admin can call this endpoint',
        `Only admin users can access all users information. Your type of user is: ${userFromReq.type}`,
        'USER_ERROR-02',
        'GET {api_domain}/user/',
      );
      throw new ForbiddenException(messageError);
    }
    return await this.prisma.user.findMany();
  }

  async findOne(req: Request, id: string) {
    const userFromReq = req['user'];
    if (userFromReq.id != id && userFromReq.type != 'ADMIN') {
      const messageError = new ForbiddenRequestSwagger(
        'You just can access your user information',
        `Only admin users can access another users informations. Your type of user is: ${userFromReq.type}`,
        'USER_ERROR-03',
        'GET {api_domain}/user/:id',
      );
      throw new ForbiddenException(messageError);
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      const messageError = new NotFoundRequestSwagger(
        'User id informed not exists',
        'ID informed in parametres not pertences to a user in our database',
        'USER_ERROR-04',
        'GET {api_domain}/user/:id',
      );
      throw new NotFoundException(messageError);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action ${updateUserDto} updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
