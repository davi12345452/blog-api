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

  async create(req: Request, data: CreateCategoryDto) {
    const userFromReq = req['user'];
    if (userFromReq.type != 'ADMIN') {
      throw new ForbiddenException(this.logsError.CATEGORY_ERROR_O1);
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

  async findAll(limit?: number) {
    if (limit) {
      return await this.prisma.category.findMany({ take: limit });
    }
    return await this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(this.logsError.CATEGORY_ERROR_03);
    }
    return category;
  }

  async update(req: Request, id: string, data: UpdateCategoryDto) {
    const userFromReq = req['user'];
    if (userFromReq.type != 'ADMIN') {
      throw new ForbiddenException(this.logsError.CATEGORY_ERROR_04);
    }
    try {
      return await this.prisma.category.update({ where: { id }, data });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(this.logsError.CATEGORY_ERROR_05);
    }
  }

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
