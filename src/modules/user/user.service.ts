import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashSync } from 'bcrypt';
import { Request } from 'express';
import { ErrorsUserLogs } from './utils/errors-user-logs';
import { UpdatePasswordDto } from './dto/update-password-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private logErrors: ErrorsUserLogs,
  ) {}

  /**
   * Essa função é utilizada para a criação de um usuário. É necessário informar
   * o nome, uma senha e um email único, ou seja, não pode ter sido utilizado.
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email } = createUserDto;
      const hashedPassword = hashSync(createUserDto.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
        },
      });

      const { id, created_at, updated_at } = newUser;

      return {
        id,
        name,
        email,
        created_at,
        updated_at,
      };
    } catch (error) {
      console.error({
        message: 'Some error ocurred to create user',
        error,
      });
      if (error.code == 'P2002') {
        throw new BadRequestException(this.logErrors.USER_ERROR_01);
      } else {
        throw new BadRequestException(this.logErrors.USER_ERROR_02);
      }
    }
  }

  /**
   * Este função permite um usuário autenticado como ADMIN a ter acesso às
   * informações de todos os usuários da plataforma. Caso não for, da erro.
   */
  async findAll(req: Request) {
    const userFromReq = req['user'];
    if (userFromReq.type != 'ADMIN') {
      throw new ForbiddenException(this.logErrors.USER_ERROR_03);
    }
    return await this.prisma.user.findMany({ select: { password: false } });
  }

  /**
   * Esta função permite visualizar um usuário específico. Se esse usuário não for o mesmo
   * que chama o endpoint, deve ter autenticação ADMIN. Caso não for, da erro.
   */
  async findOne(req: Request, id: string) {
    const userFromReq = req['user'];
    if (userFromReq.id != id && userFromReq.type != 'ADMIN') {
      throw new ForbiddenException(this.logErrors.USER_ERROR_04);
    }
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        password: false,
      },
    });
    if (!user) {
      throw new NotFoundException(this.logErrors.USER_ERROR_05);
    }
    return user;
  }

  /**
   * Permite que o usuário que chama o Endpoint atualize seus dados não essenciais. Não pode
   * alterar o email, por conta da questão de unicidade no sistema. Senha é em outro lugar,
   * com uma segurança maior.
   */
  async update(req: Request, updateUserDto: UpdateUserDto) {
    const userFromReq = req['user'];
    const data: any = {};
    if (updateUserDto.name) {
      data.name = updateUserDto.name;
    }
    try {
      const user = await this.prisma.user.update({
        where: { id: userFromReq.id },
        data,
      });
      const { id, name, email, created_at, updated_at } = user;

      return {
        id,
        name,
        email,
        created_at,
        updated_at,
      };
    } catch (error) {
      console.error({
        message: 'Some error ocurred to update user',
        error,
      });
      throw new BadRequestException(this.logErrors.USER_ERROR_06);
    }
  }

  /**
   * Permite que um usuário delete a sua conta. É necessário que seja o próprio usuário
   * que faça isso. Caso não for, da erro.
   */
  async remove(req: Request) {
    const userFromReq = req['user'];
    try {
      await this.prisma.user.delete({ where: { id: userFromReq.id } });
      return { message: 'Succes to delete user', id: userFromReq.id };
    } catch (error) {
      console.error({
        message: 'Some error ocurred to delete user',
        error,
      });
      throw new BadRequestException(this.logErrors.USER_ERROR_07);
    }
  }

  /**
   * Esta função é utilizada no endpoint que permite o usuário atualizar a sua senha.
   * Ela reconhece o usuário pela requisição, ou seja, precisa estar logado.
   */
  async updatePassword(req: Request, updatePasswordDto: UpdatePasswordDto) {
    const userFromReq = req['user'];
    const hashedAcutalPassword = hashSync(updatePasswordDto.actualPassword, 10);

    const user = await this.prisma.user.findUnique({
      where: { id: userFromReq.id },
    });

    if (user.password != hashedAcutalPassword) {
      throw new UnauthorizedException(this.logErrors.USER_ERROR_08);
    }

    const hashedNewPassword = hashSync(updatePasswordDto.newPassword, 10);
    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedNewPassword,
        },
      });
      return {
        message: 'Password updated sucessufully',
      };
    } catch (error) {
      console.error({
        message: 'Some error ocurred to update password user',
        error,
      });
      throw new BadRequestException(this.logErrors.USER_ERROR_09);
    }
  }
}
