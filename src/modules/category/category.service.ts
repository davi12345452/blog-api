import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { ErrorsCategoryLogs } from './utils/errors-category-logs';
import { createSlug } from './utils/create-slug';

@Injectable()
export class CategoryService {
  constructor(
    private readonly logsError: ErrorsCategoryLogs,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Esta função é utilizada no endpoint de criação de categorias para o sistema. Ela
   * só pode ser chamada por usuários admins. Apenas administradores podem criar cate-
   * gorias.
   */
  async create(req: Request, data: CreateCategoryDto) {
    const userFromReq = req['user'];
    if (userFromReq.type != 'ADMIN') {
      throw new ForbiddenException(this.logsError.CATEGORY_ERROR_01);
    }
    try {
      return await this.prisma.category.create({
        data: {
          name: data.name,
          description: data.description,
          slug: createSlug(data.name),
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(this.logsError.CATEGORY_ERROR_02);
    }
  }

  /**
   * Permite visualizar várias categorias. Pode ser chamada por qualquer
   * usuário.
   */
  async findAll(limit?: number) {
    if (limit) {
      return await this.prisma.category.findMany({ take: limit });
    }
    return await this.prisma.category.findMany();
  }

  /**
   * Permite visualizar uma categoria específica. Pode ser chamada por qualquer
   * usuário.
   */

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(this.logsError.CATEGORY_ERROR_03);
    }
    return category;
  }

  /**
   * Permite editar uma categoria específica. Essa função é utilizada em um endpoint
   * e só pode ser chamada por ADMIN.
   */
  async update(req: Request, id: string, data: UpdateCategoryDto) {
    const userFromReq = req['user'];
    if (userFromReq.type != 'ADMIN') {
      throw new ForbiddenException(this.logsError.CATEGORY_ERROR_04);
    }
    if (data.name) {
      data.slug = createSlug(data.name);
    }
    try {
      return await this.prisma.category.update({ where: { id }, data });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(this.logsError.CATEGORY_ERROR_05);
    }
  }

  /**
   * Permite deletar uma categoria. Essa função é utilizada em um endpoint e
   * só pode ser chamada por usuários ADMIN.
   */
  async remove(req: Request, id: string) {
    const userFromReq = req['user'];
    if (userFromReq.type != 'ADMIN') {
      throw new ForbiddenException(this.logsError.CATEGORY_ERROR_06);
    }
    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(this.logsError.CATEGORY_ERROR_07);
    }
  }
}
